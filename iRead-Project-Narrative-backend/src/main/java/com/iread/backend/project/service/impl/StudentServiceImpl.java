package com.iread.backend.project.service.impl;

import com.iread.backend.project.controller.request.AccessStoryDTORequest;
import com.iread.backend.project.controller.request.StudentActivityDTORequest;
import com.iread.backend.project.controller.request.StudentDTORequest;
import com.iread.backend.project.controller.response.StoryDTOResponse;
import com.iread.backend.project.controller.response.StudentDTOResponse;
import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.entity.Story;
import com.iread.backend.project.entity.Student;
import com.iread.backend.project.entity.StudentActivity;
import com.iread.backend.project.exception.ResourceNotFoundException;
import com.iread.backend.project.repository.ActivityRepository;
import com.iread.backend.project.repository.StoryRepository;
import com.iread.backend.project.repository.StudentActivityRepository;
import com.iread.backend.project.repository.StudentRepository;
import com.iread.backend.project.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final StudentActivityRepository studentActivityRepository;
    private final StoryRepository storyRepository;
    private final ActivityRepository activityRepository;

    @Transactional
    @Override
    public StudentDTOResponse registerStudent(StudentDTORequest request) {

        return StudentDTOResponse.builder()
                .nameStudent(request.getNameStudent()).build();
    }

    public StoryDTOResponse accessStory(AccessStoryDTORequest accessStoryDTORequest) {
        Story story = storyRepository.findStoryByAccessWord(accessStoryDTORequest.getAccessWord());
        if (story != null) {
            return new StoryDTOResponse(story.getId(), story.getAccessWord(), story.getActive());
        } else {
            throw new IllegalStateException("No se puede acceder a la historia.");
        }
    }

    @Transactional
    @Override
    public StudentActivity completeActivity(Long studentId, StudentActivityDTORequest studentActiv, Long activityId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + studentId));

        StudentActivity studentActivity = StudentActivity.builder()
                .correctAnswer(studentActiv.getCorrectAnswer())
                .consultedWord(studentActiv.getConsultedWord())
                .student(student)
                .activity(activity)
                .build();

        return studentActivityRepository.save(studentActivity);
    }

}
