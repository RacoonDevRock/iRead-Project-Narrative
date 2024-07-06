package com.iread.backend.project.controller;

import com.iread.backend.project.controller.request.AuthenticationDTORequest;
import com.iread.backend.project.controller.request.TeacherDTO;
import com.iread.backend.project.controller.request.TeacherDTORequest;
import com.iread.backend.project.controller.response.TokenDTOResponse;
import com.iread.backend.project.registration.RegistrationService;
import com.iread.backend.project.service.TeacherService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
@AllArgsConstructor
public class AuthController {

    private final RegistrationService registrationService;
    private final TeacherService teacherService;

    @PostMapping("/register")
    public ResponseEntity<TeacherDTO> register(@Valid @RequestBody TeacherDTORequest request){
        return ResponseEntity.ok(registrationService.register(request));
    }

    @GetMapping(path = "/confirmation")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDTOResponse> authenticate(@Valid @RequestBody AuthenticationDTORequest request){
        return ResponseEntity.ok(teacherService.authenticate(request));
    }

}
