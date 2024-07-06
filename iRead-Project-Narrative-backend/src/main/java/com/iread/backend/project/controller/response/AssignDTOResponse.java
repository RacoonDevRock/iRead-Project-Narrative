package com.iread.backend.project.controller.response;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"title", "accessWord", "activityId"})
public record AssignDTOResponse(String title,
                               String accessWord,
                               Long activityId) {
}
