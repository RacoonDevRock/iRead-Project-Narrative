package com.iread.backend.project.controller;

import com.iread.backend.project.controller.request.ActivityDTORequest;
import com.iread.backend.project.controller.request.StoryDTORequest;
import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.entity.Story;
import com.iread.backend.project.service.impl.StoryServiceImpl;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stories")
@Tag(name = "Story", description = "Story management APIs")
@AllArgsConstructor
public class StoryController {

    private final StoryServiceImpl storyServiceImpl;

    @PostMapping("/createStory/{teacherId}")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<StoryDTOResponse> createStory(@PathVariable Long teacherId, @RequestBody StoryDTORequest storyDTORequest) {
        StoryDTOResponse createdStory = storyServiceImpl.createStoryForTeacher(teacherId, storyDTORequest);
        return new ResponseEntity<>(createdStory, HttpStatus.CREATED);
    }

    @PutMapping("/{storyId}/activity")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<StoryDTOResponse> assignActivityToStory(@PathVariable Long storyId, @RequestBody ActivityDTORequest activityDetails) {
        StoryDTOResponse updatedStory = storyServiceImpl.assignActivityToStory(storyId, activityDetails);
        return ResponseEntity.ok(updatedStory);
    }

    @GetMapping("/byTeacher/{teacherId}")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<List<StoryDTOResponse>> getStoriesByTeacherId(@PathVariable Long teacherId) {
        List<StoryDTOResponse> storyDTOResponses = storyServiceImpl.findAllStoriesByTeacherId(teacherId);
        return ResponseEntity.ok(storyDTOResponses);
    }

    @PutMapping("/activate/{storyId}")
    @SecurityRequirement(name = "Bearer Authentication")
    public String activateStory(@PathVariable Long storyId) {
        return storyServiceImpl.activateStory(storyId);
    }

    //trae la actividad al niño: publicEndpoint
    @GetMapping("/{storyId}/activity")
    public ResponseEntity<Activity> getActivityByStoryId(@PathVariable Long storyId) {
        Activity activity = storyServiceImpl.getActivityByStoryId(storyId);
        return ResponseEntity.ok(activity);
    }

    @PutMapping("/deactivate/{storyId}")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<Map<String, Object>> deactivateStory(@PathVariable Long storyId) {
        Map<String, Object> response = storyServiceImpl.deactivateStory(storyId);
        return ResponseEntity.ok(response);
    }
}
