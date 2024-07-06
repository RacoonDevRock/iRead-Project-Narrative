package com.iread.backend.project.controller.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iread.backend.project.entity.Activity;
import com.iread.backend.project.entity.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentActivityDTORequest {
    private int correctAnswer;
    private String consultedWord;
    private Activity activity;
    private Student student;
}
