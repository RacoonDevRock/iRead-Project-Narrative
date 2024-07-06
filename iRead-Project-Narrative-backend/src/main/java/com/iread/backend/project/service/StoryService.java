package com.iread.backend.project.service;

import com.iread.backend.project.controller.request.ActivityDTORequest;
import com.iread.backend.project.controller.request.StoryDTORequest;
import com.iread.backend.project.controller.response.AssignDTOResponse;
import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Map;

public interface StoryService {
    StoryDTOResponse createStoryForTeacher(StoryDTORequest storyDTORequest) throws ResourceNotFoundException;

    AssignDTOResponse assignActivityToStory(Long storyId, ActivityDTORequest activityDetails) throws ResourceNotFoundException;

    List<StoryDTOResponse> findAllStoriesByTeacherId();

    String activateStory(Long storyId) throws ResourceNotFoundException;

    Activity getActivityByStoryId(Long storyId) throws ResourceNotFoundException;

    Map<String, Object> deactivateStory(Long storyId) throws ResourceNotFoundException;

}
