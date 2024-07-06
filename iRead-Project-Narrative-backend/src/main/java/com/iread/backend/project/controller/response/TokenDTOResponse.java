package com.iread.backend.project.controller.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;

@JsonPropertyOrder({"message", "token"})
public record TokenDTOResponse(String message,
                               String token) {
    @Builder
    public TokenDTOResponse {}
}