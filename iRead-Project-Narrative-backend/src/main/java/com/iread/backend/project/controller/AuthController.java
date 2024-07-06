package com.iread.backend.project.controller;

import com.iread.backend.project.config.service.IUserDetailService;
import com.iread.backend.project.controller.request.LoginDTORequest;
import com.iread.backend.project.controller.request.TeacherDTORequest;
import com.iread.backend.project.controller.response.LoginDTOResponse;
import com.iread.backend.project.controller.response.MessageResponse;
import com.iread.backend.project.controller.response.SignUpDTOResponse;
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
    private final IUserDetailService userService;

    @PostMapping("/register")
    public ResponseEntity<SignUpDTOResponse> register(@Valid @RequestBody TeacherDTORequest request){
        return ResponseEntity.ok(userService.createUser(request));
    }

    @GetMapping(path = "/confirmation")
    public MessageResponse confirm(@RequestParam("token") String token) {
        return userService.confirmAccount(token);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<LoginDTOResponse> authenticate(@Valid @RequestBody LoginDTORequest request){
        return ResponseEntity.ok(userService.loginUser(request));
    }

}
