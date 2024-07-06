package com.iread.backend.project.controller.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"message", "token", "role"})
public record LoginDTOResponse(String message,
                               String token,
                               String role) {
}

