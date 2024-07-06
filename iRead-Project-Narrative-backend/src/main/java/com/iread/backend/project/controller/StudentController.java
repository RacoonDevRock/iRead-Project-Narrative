package com.iread.backend.project.controller;

import com.iread.backend.project.controller.request.AccessStoryDTORequest;
import com.iread.backend.project.controller.request.StudentActivityDTORequest;
import com.iread.backend.project.controller.request.StudentDTORequest;
import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.controller.response.StudentDTOResponse;
import com.iread.backend.project.entity.StudentActivity;
import com.iread.backend.project.service.StudentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@Tag(name = "Student", description = "Student management APIs")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/access-story")
    public ResponseEntity<StoryDTOResponse> accessStory(@Valid @RequestBody AccessStoryDTORequest accessStoryDTORequest) {
        StoryDTOResponse storyDTOResponse = studentService.accessStory(accessStoryDTORequest);
        return ResponseEntity.ok(storyDTOResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<StudentDTOResponse> registerStudent(@Valid @RequestBody StudentDTORequest studentDTORequest) {
        return ResponseEntity.ok(studentService.registerStudent(studentDTORequest));
    }

    @PostMapping("/{studentId}/studentActivities/{activityId}")
    public ResponseEntity<StudentActivity> completeActivity(@PathVariable Long studentId,
                                                            @RequestBody StudentActivityDTORequest studentActivityDTORequest,
                                                            @PathVariable Long activityId) {
        StudentActivity completedActivity = studentService.completeActivity(studentId, studentActivityDTORequest, activityId);
        return ResponseEntity.ok(completedActivity);
    }
}