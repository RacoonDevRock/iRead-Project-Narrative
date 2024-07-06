package com.iread.backend.project.service.impl;

import com.iread.backend.project.entity.Teacher;
import com.iread.backend.project.repository.TeacherRepository;
import com.iread.backend.project.service.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {
    private final TeacherRepository teacherRepository;

    @Override
    public Optional<Teacher> findTeacherByEmail(String email) {
        return teacherRepository.findUserByEmail(email);
    }

    @Override
    public Teacher saveTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }
}
