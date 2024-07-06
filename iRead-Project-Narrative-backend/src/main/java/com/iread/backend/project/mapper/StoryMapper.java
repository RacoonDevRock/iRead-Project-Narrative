package com.iread.backend.project.mapper;

import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.entity.Story;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class StoryMapper {

    private final ModelMapper modelMapper;

    public StoryMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public StoryDTOResponse mapToDTO(Story story) {
        return StoryDTOResponse.builder()
                .title(story.getTitle())
                .accessWord(story.getAccessWord())
                .active(story.getActive())
                .build();
    }

    public Story mapToModel(StoryDTOResponse storyDTOResponse) {
        return modelMapper.map(storyDTOResponse, Story.class);
    }

}
