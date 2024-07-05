package com.iread.backend.project.service;

import com.iread.backend.project.dto.StoryDTO;
import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.entity.Story;
import com.iread.backend.project.exception.ResourceNotFoundException;

import java.util.List;

public interface StoryService {
    Story createStoryForTeacher(Long teacherId, Story story) throws ResourceNotFoundException;
    Story assignActivityToStory(Long storyId, Activity activityDetails) throws ResourceNotFoundException;
    List<StoryDTO> findAllStoriesByTeacherId(Long teacherId);
    String activateStory(Long storyId) throws ResourceNotFoundException;
}
