package com.iread.backend.project.service.impl;

import com.iread.backend.project.controller.request.ActivityDTORequest;
import com.iread.backend.project.controller.request.StoryDTORequest;
import com.iread.backend.project.controller.response.AssignDTOResponse;
import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.entity.Story;
import com.iread.backend.project.entity.StudentActivity;
import com.iread.backend.project.entity.Teacher;
import com.iread.backend.project.exception.ResourceNotFoundException;
import com.iread.backend.project.mapper.StoryMapper;
import com.iread.backend.project.repository.ActivityRepository;
import com.iread.backend.project.repository.StoryRepository;
import com.iread.backend.project.service.StoryService;
import com.iread.backend.project.service.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;
    private final TeacherService teacherService;
    private final StoryMapper storyMapper;
    private final ActivityRepository activityRepository;

    private static final String STORY_NOT_FOUND_MESSAGE = "Story not found with id: ";

    @Transactional
    @Override
    public StoryDTOResponse createStoryForTeacher(StoryDTORequest storyDTORequest) throws ResourceNotFoundException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Teacher teacher = teacherService.findTeacherByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found for email: " + email));

        Story story = Story.builder()
                .title(storyDTORequest.getTitle())
                .accessWord(storyDTORequest.getAccessWord())
                .teacher(teacher)
                .activity(storyDTORequest.getActivity())
                .build();

        storyRepository.save(story);
        return new StoryDTOResponse(story.getTitle(), story.getAccessWord(), story.getActive());
    }

    @Transactional
    @Override
    public AssignDTOResponse assignActivityToStory(Long storyId, ActivityDTORequest activityDetails) throws ResourceNotFoundException {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException(STORY_NOT_FOUND_MESSAGE + storyId));

        Activity activity = Activity.builder()
                .jsonConverted(activityDetails.getJsonConverted())
                .imgPreview(activityDetails.getImgPreview())
                .story(story).build();

        activityRepository.save(activity);
        story.setActivity(activity);
        storyRepository.save(story);

        return new AssignDTOResponse(story.getTitle(), story.getAccessWord(), activity.getId());
    }

    @Transactional(readOnly = true)
    @Override
    public List<StoryDTOResponse> findAllStoriesByTeacherId() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        List<Story> stories = storyRepository.findAllStoriesByTeacherEmail(email);

        return stories.stream()
                .map(storyMapper::mapToDTO)
                .toList();
    }

    @Transactional
    @Override
    public String activateStory(Long storyId) throws ResourceNotFoundException {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException(STORY_NOT_FOUND_MESSAGE + storyId));

        story.setActive(true);
        storyRepository.save(story);

        return story.getTitle();
    }

    @Transactional(readOnly = true)
    @Override
    public Activity getActivityByStoryId(Long storyId) throws ResourceNotFoundException {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException(STORY_NOT_FOUND_MESSAGE + storyId));

        return story.getActivity();
    }

    @Transactional
    @Override
    public Map<String, Object> deactivateStory(Long storyId) throws ResourceNotFoundException {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException(STORY_NOT_FOUND_MESSAGE + storyId));

        story.setActive(false);
        storyRepository.save(story);

        List<StudentActivity> studentActivities = story.getActivity().getStudentActivities();
        List<Map<String, Object>> studentDetails = story.getActivity().getStudentActivities().stream()
                .map(this::mapStudentActivityDetails)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("title", story.getTitle());
        response.put("students", studentDetails);
        response.put("totalStudents", studentActivities.size());

        return response;
    }

    private Map<String, Object> mapStudentActivityDetails(StudentActivity studentActivity) {
        Map<String, Object> details = new HashMap<>();
        details.put("nameStudent", studentActivity.getStudent().getNameStudent());
        details.put("correctAnswer", studentActivity.getCorrectAnswer());
        details.put("consultedWord", studentActivity.getConsultedWord());
        return details;
    }

}
