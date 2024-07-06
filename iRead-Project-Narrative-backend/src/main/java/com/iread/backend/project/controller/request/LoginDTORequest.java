package com.iread.backend.project.controller.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTORequest {

    @NotBlank(message = "The 'email' field is required")
    @Email(message = "The 'email' field must have a valid format")
    private String email;

    @NotBlank(message = "The 'password' field is required")
    private String password;
}
