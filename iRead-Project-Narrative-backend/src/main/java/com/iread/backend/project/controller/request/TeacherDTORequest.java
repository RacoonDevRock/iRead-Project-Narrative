package com.iread.backend.project.controller.request;

import com.iread.backend.project.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherDTORequest {

    @NotBlank(message = "Por favor agrega un nombre")
    @Size(max = 25, message = "The 'name' field must not exceed 25 characters")
    private String name;

    @NotBlank(message = "Por favor agrega los apellidos")
    @Size(max = 25, message = "The 'surname' field must not exceed 25 characters")
    private String surname;

    @NotBlank(message = "Por favor agrega un correo")
    @Size(max = 30, message = "The 'email' field must not exceed 25 characters")
    @Email
    private String email;

    @NotBlank(message = "Por favor agrega una contraseña")
    @Size(min = 8, max = 25, message = "La contraseña debe tener entre 8 y 25 caracteres.")
    private String password;

    @Builder.Default
    private Role role = Role.USER;

}
