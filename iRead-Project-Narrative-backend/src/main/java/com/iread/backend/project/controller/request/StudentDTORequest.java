package com.iread.backend.project.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StudentDTORequest {

    @NotBlank(message = "The 'nameStudent' field is required")
    @Size(min = 5, max = 30)
    public String nameStudent;
}
