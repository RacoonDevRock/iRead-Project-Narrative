package com.iread.backend.project.controller.request;

import com.iread.backend.project.entity.Activity;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StoryDTORequest {

    @NotBlank(message = "Por favor agrega un titulo")
    @Size(min = 10, max = 25)
    private String title;

    @NotBlank(message = "Por favor agrega una clave de acceso")
    @Size(min = 5, max = 15, message = "La clave debe tener entre 5 y 15 caracteres.")
    @Column(unique = true)
    private String accessWord;
    private Activity activity;
}
