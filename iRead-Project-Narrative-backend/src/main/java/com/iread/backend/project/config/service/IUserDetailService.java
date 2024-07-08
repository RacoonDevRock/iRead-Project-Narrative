package com.iread.backend.project.config.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.iread.backend.project.config.util.JwtUtils;
import com.iread.backend.project.controller.request.LoginDTORequest;
import com.iread.backend.project.controller.request.TeacherDTORequest;
import com.iread.backend.project.controller.response.LoginDTOResponse;
import com.iread.backend.project.controller.response.MessageResponse;
import com.iread.backend.project.controller.response.SignUpDTOResponse;
import com.iread.backend.project.entity.Teacher;
import com.iread.backend.project.exception.IncorrectCredentials;
import com.iread.backend.project.exception.TokenNotFound;
import com.iread.backend.project.repository.TeacherRepository;
import com.iread.backend.project.service.RoleService;
import com.iread.backend.project.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IUserDetailService implements UserDetailsService {
    private final TeacherService teacherService;
    private final JwtUtils jwtUtils;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;

    @Value("${spring.email.username}")
    private String mailOrigin;

    @Value("${url.client.side}")
    private String baseUrl;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return teacherService.findTeacherByEmail(username)
                .map(teacher -> new User(teacher.getEmail(), teacher.getPassword(), true, true, true, true,
                        AuthorityUtils.createAuthorityList(teacher.getRole().getRoleEnum().name())))
                .orElseThrow(() -> new UsernameNotFoundException("User(Teacher) " + username + " not found"));
    }

    public LoginDTOResponse loginUser(LoginDTORequest loginDTORequest) {
        String email = loginDTORequest.getEmail();
        String password = loginDTORequest.getPassword();

        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = loadUserByUsername(email);
        if (!userDetails.isEnabled()) {
            throw new IncorrectCredentials("The account is not enabled");
        }

        String accessToken = jwtUtils.createToken(authentication);

        return new LoginDTOResponse("User logged successfully", accessToken,
                authentication.getAuthorities().stream()
                        .findFirst()
                        .map(GrantedAuthority::getAuthority)
                        .orElse(""));
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = loadUserByUsername(email);

        if (userDetails == null || !passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new IncorrectCredentials("Invalid email or password");
        }

        return new UsernamePasswordAuthenticationToken(email, userDetails.getPassword(), userDetails.getAuthorities());
    }

    public SignUpDTOResponse createUser(TeacherDTORequest teacherDTORequest) {

        var teacher = Teacher.builder()
                .teacherName(teacherDTORequest.getTeacherName())
                .teacherSurname(teacherDTORequest.getTeacherSurname())
                .email(teacherDTORequest.getEmail())
                .password(passwordEncoder.encode(teacherDTORequest.getPassword()))
                .isEnabled(true)
                .accountNonLocked(true)
                .accountNonExpired(true)
                .credentialsNonExpired(true)
                .role(roleService.findByRoleEnum(teacherDTORequest.getRole()))
                .build();

        Teacher teacherCreated = teacherService.saveTeacher(teacher);

        SecurityContextHolder.getContext();
        Authentication authentication = new UsernamePasswordAuthenticationToken(teacherCreated.getEmail(),
                teacherCreated.getPassword(), AuthorityUtils.createAuthorityList(teacherCreated.getRole().getRoleEnum().name()));
        String accessToken = jwtUtils.createToken(authentication);

        sendSimpleMessage(
                teacherCreated.getEmail(),
                "Account Verification - iRead",
                "Estimado/a " + teacher.getTeacherName() + ",\n\nGracias por iRead en iMechanic. Por favor, haz clic en el siguiente enlace para confirmar tu cuenta:\n\n" + baseUrl + "/verificar/" + accessToken + "\n\nSaludos,\nEl equipo de iMechanic");

        return new SignUpDTOResponse("Welcome to iRead, '" + teacherDTORequest.getTeacherName() + "' .You have been successfully registered.");
    }

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailOrigin);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }

    public MessageResponse confirmAccount(String token) {
        DecodedJWT decodedJWT = jwtUtils.validateToken(token);
        String username = jwtUtils.extractUsername(decodedJWT);

        Teacher teacher = teacherService.findTeacherByEmail(username)
                .orElseThrow(() -> new TokenNotFound("The teacher token " + username + " is invalid invalid."));

        teacher.setEnabled(true);
        teacherService.saveTeacher(teacher);
        return new MessageResponse("Account successfully confirmed for " + username);
    }

}