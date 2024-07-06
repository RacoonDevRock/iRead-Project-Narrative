package com.iread.backend.project.controller;

import com.iread.backend.project.controller.request.AccessStoryDTORequest;
import com.iread.backend.project.controller.request.StudentActivityDTORequest;
import com.iread.backend.project.controller.request.StudentDTORequest;
import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.controller.response.StudentDTOResponse;
import com.iread.backend.project.entity.StudentActivity;
import com.iread.backend.project.service.impl.StudentServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@Tag(name = "Student", description = "Student management APIs")
@AllArgsConstructor
public class StudentController {

    private final StudentServiceImpl studentServiceImpl;

    @PostMapping("/access-story")
    public ResponseEntity<StoryDTOResponse> accessStory(@RequestBody AccessStoryDTORequest accessStoryDTORequest) {
        StoryDTOResponse storyDTOResponse = studentServiceImpl.accessStory(accessStoryDTORequest);
        return ResponseEntity.ok(storyDTOResponse);
    }

    @PostMapping("/register-student")
    public ResponseEntity<StudentDTOResponse> registerStudent(@RequestBody StudentDTORequest studentDTORequest) {
        return ResponseEntity.ok(studentServiceImpl.registerStudent(studentDTORequest));
    }

    @PostMapping("/{studentId}/studentActivities/{activityId}")
    public ResponseEntity<StudentActivity> completeActivity(@PathVariable Long studentId,
                                                            @RequestBody StudentActivityDTORequest studentActivityDTORequest,
                                                            @PathVariable Long activityId) {
        StudentActivity completedActivity = studentServiceImpl.completeActivity(studentId, studentActivityDTORequest, activityId);
        return ResponseEntity.ok(completedActivity);
    }
}