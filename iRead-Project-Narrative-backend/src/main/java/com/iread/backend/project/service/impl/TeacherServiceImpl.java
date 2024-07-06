package com.iread.backend.project.service.impl;

import com.iread.backend.project.config.jwt.JwtService;
import com.iread.backend.project.controller.request.AuthenticationDTORequest;
import com.iread.backend.project.controller.response.TokenDTOResponse;
import com.iread.backend.project.entity.Role;
import com.iread.backend.project.entity.Teacher;
import com.iread.backend.project.exception.EmailExistsException;
import com.iread.backend.project.exception.EmailNotFoundException;
import com.iread.backend.project.registration.token.ConfirmationToken;
import com.iread.backend.project.registration.token.ConfirmationTokenService;
import com.iread.backend.project.repository.TeacherRepository;
import com.iread.backend.project.service.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public Optional<Teacher> findUserByEmail(String email) {
        return teacherRepository.findUserByEmail(email);
    }

    public void validateUserDoesNotExist(String email) {
        findUserByEmail(email).ifPresent(user -> {
            throw new EmailExistsException("El email " + email + " ingresado ya existe");
        });
    }

    private String generateTokenForUser(Teacher user) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                user
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);
        return token;
    }

    @Transactional
    @Override
    public TokenDTOResponse singUpUser(Teacher user) {
        validateUserDoesNotExist(user.getEmail());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        teacherRepository.save(user);

        String token = generateTokenForUser(user);

        return TokenDTOResponse.builder()
                .message("User registrado con exito")
                .token(token)
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public TokenDTOResponse authenticate(AuthenticationDTORequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = getTeacherByEmail(request.getEmail());

        Long teacherID = user.getId();
        var extraClaims = new HashMap<String, Object>();

        var jwtToken = jwtService.generateToken(teacherID.toString(), extraClaims, user);

        return TokenDTOResponse.builder()
                .message("Autenticacion exitosa")
                .token(jwtToken)
                .build();
    }

    private Teacher getTeacherByEmail(String email) {
        return teacherRepository.findUserByEmail(email).orElseThrow(() -> new EmailNotFoundException("Teacher not found"));
    }

    @Transactional(readOnly = true)
    @Override
    public int enableUser(String email) {
        return teacherRepository.enableUser(email);
    }

}