package com.iread.backend.project.controller.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iread.backend.project.entity.Story;
import com.iread.backend.project.entity.StudentActivity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ActivityDTORequest {
    private String jsonConverted;
    private String imgPreview;
    private Story story;
    private List<StudentActivity> studentActivities;

}
