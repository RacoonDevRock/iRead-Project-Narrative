package com.iread.backend.project.controller.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"nameStudent"})
public record StudentDTOResponse(String nameStudent) {
}
