package com.iread.backend.project.service;

import com.iread.backend.project.controller.request.AccessStoryDTORequest;
import com.iread.backend.project.controller.request.StudentActivityDTORequest;
import com.iread.backend.project.controller.request.StudentDTORequest;
import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.controller.response.StudentDTOResponse;
import com.iread.backend.project.entity.StudentActivity;

public interface StudentService {
    StudentDTOResponse registerStudent(StudentDTORequest studentDTORequest);

    StoryDTOResponse accessStory(AccessStoryDTORequest accessStoryDTORequest);

    StudentActivity completeActivity(Long studentId, StudentActivityDTORequest studentActivity, Long activityId);
}
