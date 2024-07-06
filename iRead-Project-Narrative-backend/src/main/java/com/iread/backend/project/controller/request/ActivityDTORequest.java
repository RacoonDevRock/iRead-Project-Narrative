package com.iread.backend.project.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ActivityDTORequest {

    @NotBlank
    private String jsonConverted;

    @NotBlank
    private String imgPreview;
}
