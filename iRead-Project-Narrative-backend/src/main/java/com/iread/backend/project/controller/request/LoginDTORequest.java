package com.iread.backend.project.controller.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTORequest {

    @NotBlank(message = "The 'email' field is required")
    @Email(message = "The 'email' field must have a valid format")
    @Column(unique = true)
    private String email;

    @NotBlank(message = "The 'password' field is required")
    @Size(min = 8, message = "The 'password' field must have at least 8 characters")
    private String password;
}
