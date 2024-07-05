package com.iread.backend.project.controller;

import com.iread.backend.project.dto.StoryDTORequest;
import com.iread.backend.project.dto.StoryResponse;
import com.iread.backend.project.entity.Student;
import com.iread.backend.project.entity.StudentActivity;
import com.iread.backend.project.service.StudentServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
@Tag(name = "Student", description = "Student management APIs")
@AllArgsConstructor
public class StudentController {

    private final StudentServiceImpl studentServiceImpl;

    @PostMapping("/access-story")
    public ResponseEntity<StoryResponse> accessStory(@RequestBody StoryDTORequest storyDTORequest) {
        StoryResponse storyResponse = studentServiceImpl.accessStory(storyDTORequest);
        return ResponseEntity.ok(storyResponse);
    }

    @PostMapping("/register-student")
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentServiceImpl.registerStudent(student));
    }

    @PostMapping("/{studentId}/studentActivities/{activityId}")
    public ResponseEntity<StudentActivity> completeActivity(@PathVariable Long studentId,
                                                            @RequestBody StudentActivity studentActivity,
                                                            @PathVariable Long activityId) {
        StudentActivity completedActivity = studentServiceImpl.completeActivity(studentId, studentActivity, activityId);
        return ResponseEntity.ok(completedActivity);
    }
}