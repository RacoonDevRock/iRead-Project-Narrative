package com.iread.backend.project.registration;

import com.iread.backend.project.controller.response.TokenDTOResponse;
import com.iread.backend.project.controller.request.TeacherDTO;
import com.iread.backend.project.controller.request.TeacherDTORequest;
import com.iread.backend.project.email.EmailSender;
import com.iread.backend.project.entity.Teacher;
import com.iread.backend.project.mapper.TeacherMapper;
import com.iread.backend.project.registration.token.ConfirmationToken;
import com.iread.backend.project.registration.token.ConfirmationTokenService;
import com.iread.backend.project.service.impl.TeacherServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final TeacherServiceImpl teacherService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    public final TeacherMapper teacherMapper;
    private final TemplateEngine templateEngine;

    public TeacherDTO register(TeacherDTORequest request) {

        Teacher teacher = new Teacher(
                request.getName(),
                request.getSurname(),
                request.getEmail(),
                request.getPassword()
        );

        TokenDTOResponse token = teacherService.singUpUser(teacher);

//        String link = "https://iread-backend.onrender.com/api/auth/confirm?token=" + token; //Request o application properties
        String link = "http://localhost:8080/api/auth/confirm?token=" + token;

        String emailContent = buildEmail(request.getName(), link);
        emailSender.send(
                request.getEmail(), emailContent);

        return teacherMapper.mapToDTO(teacher);
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        teacherService.enableUser(
                confirmationToken.getTeacher().getEmail());

        return "confirmed";
    }

    private String buildEmail(String name, String link) {
        // Carga la plantilla Thymeleaf y genera el contenido del email
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("link", link);
        return templateEngine.process("confirmacion", context);
    }
}