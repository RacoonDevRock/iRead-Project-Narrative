package com.iread.backend.project.service.impl;

import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.exception.ResourceNotFoundException;
import com.iread.backend.project.repository.ActivityRepository;
import com.iread.backend.project.service.ActivityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {
    private final ActivityRepository activityRepository;

    @Transactional(readOnly = true)
    @Override
    public Activity findActivity(Long activityId) {
        return activityRepository.findById(activityId)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found with id: " + activityId));
    }
}
