package com.iread.backend.project.controller.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StoryDTOResponse {
    private Long storyId;
    private String accessWord;
    private Boolean active;
}