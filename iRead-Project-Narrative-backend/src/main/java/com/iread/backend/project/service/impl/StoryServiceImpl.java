package com.iread.backend.project.service.impl;

import com.iread.backend.project.controller.request.ActivityDTORequest;
import com.iread.backend.project.controller.request.StoryDTORequest;
import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.entity.Story;
import com.iread.backend.project.entity.StudentActivity;
import com.iread.backend.project.entity.Teacher;
import com.iread.backend.project.exception.ResourceNotFoundException;
import com.iread.backend.project.exception.TeacherNotFoundException;
import com.iread.backend.project.mapper.StoryMapper;
import com.iread.backend.project.repository.ActivityRepository;
import com.iread.backend.project.repository.StoryRepository;
import com.iread.backend.project.repository.TeacherRepository;
import com.iread.backend.project.service.StoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;
    private final TeacherRepository teacherRepository;
    private final StoryMapper storyMapper;
    private final ActivityRepository activityRepository;

    @Transactional
    @Override
    public StoryDTOResponse createStoryForTeacher(Long teacherId, StoryDTORequest storyDTORequest) throws ResourceNotFoundException {
        Teacher teacher = teacherRepository.findTeacherById(teacherId);

        if (teacher != null) {
            Story story = Story.builder()
                    .title(storyDTORequest.getTitle())
                    .accessWord(storyDTORequest.getAccessWord())
                    .teacher(teacher)
                    .activity(storyDTORequest.getActivity())
                    .build();

            storyRepository.save(story);
            return new StoryDTOResponse(story.getId(), story.getAccessWord(), story.getActive());

        } else {
            throw new TeacherNotFoundException("No se encontró al profesor con el ID: " + teacherId);
        }
    }

    @Transactional
    @Override
    public StoryDTOResponse assignActivityToStory(Long storyId, ActivityDTORequest activityDetails) throws ResourceNotFoundException {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id: " + storyId));

        Activity newActivity = new Activity();
        newActivity.setJsonConverted(activityDetails.getJsonConverted());
        newActivity.setImgPreview(activityDetails.getImgPreview());

        newActivity.setStory(story);
        activityRepository.save(newActivity);

        story.setActivity(newActivity);
        storyRepository.save(story);

        return new StoryDTOResponse(storyId, story.getAccessWord(), story.getActive());
    }

    @Transactional(readOnly = true)
    @Override
    public List<StoryDTOResponse> findAllStoriesByTeacherId(Long teacherId) {
        List<Story> stories = storyRepository.findAllStoriesByTeacherId(teacherId);

        return stories.stream()
                .map(storyMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public String activateStory(Long storyId) throws ResourceNotFoundException {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id: " + storyId));

        story.setActive(true);
        storyRepository.save(story);

        return story.getTitle();
    }

    @Transactional(readOnly = true)
    @Override
    public Activity getActivityByStoryId(Long storyId) throws ResourceNotFoundException {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id: " + storyId));

        return story.getActivity();
    }

    @Transactional
    @Override
    public Map<String, Object> deactivateStory(Long storyId) throws ResourceNotFoundException {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found with id: " + storyId));

        story.setActive(false);
        storyRepository.save(story);

        List<StudentActivity> studentActivities = story.getActivity().getStudentActivities();
        List<Map<String, Object>> studentDetails = new ArrayList<>();

        for (StudentActivity studentActivity : studentActivities) {
            Map<String, Object> details = new HashMap<>();
            details.put("nameStudent", studentActivity.getStudent().getNameStudent());
            details.put("correctAnswer", studentActivity.getCorrectAnswer());
            details.put("consultedWord", studentActivity.getConsultedWord());
            studentDetails.add(details);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("title", story.getTitle());
        response.put("students", studentDetails);
        response.put("totalStudents", studentActivities.size());

        return response;
    }
}
