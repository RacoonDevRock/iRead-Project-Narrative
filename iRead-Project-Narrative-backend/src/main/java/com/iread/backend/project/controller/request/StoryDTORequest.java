package com.iread.backend.project.controller.request;

import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.entity.Teacher;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StoryDTORequest {
    @Size(min = 10, max = 25)
    private String title;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime dateCreation;

    @Size(min = 5, max = 15, message = "La clave debe tener entre 5 y 15 caracteres.")
    private String accessWord;
    private Boolean active;
    private Teacher teacher;
    private Activity activity;
}
