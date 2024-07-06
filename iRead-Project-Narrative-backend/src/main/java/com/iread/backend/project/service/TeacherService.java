package com.iread.backend.project.service;

import com.iread.backend.project.entity.Teacher;

import java.util.Optional;

public interface TeacherService {
    Optional<Teacher> findTeacherByEmail(String email);

    Teacher saveTeacher(Teacher teacher);
}
