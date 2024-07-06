package com.iread.backend.project.controller.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;

@JsonPropertyOrder({"nameStudent"})
public record StudentDTOResponse(String nameStudent) {
    @Builder
    public StudentDTOResponse {}
}
