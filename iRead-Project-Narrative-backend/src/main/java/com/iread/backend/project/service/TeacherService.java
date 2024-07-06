package com.iread.backend.project.service;

import com.iread.backend.project.controller.request.AuthenticationDTORequest;
import com.iread.backend.project.controller.response.TokenDTOResponse;
import com.iread.backend.project.entity.Teacher;

import java.util.Optional;

public interface TeacherService {
    Optional<Teacher> findUserByEmail(String email);

    TokenDTOResponse singUpUser(Teacher user);

    TokenDTOResponse authenticate(AuthenticationDTORequest request);

    int enableUser(String email);
}
