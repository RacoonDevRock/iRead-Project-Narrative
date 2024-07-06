package com.iread.backend.project.controller.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message"})
public record SignUpDTOResponse(String message) {
}
