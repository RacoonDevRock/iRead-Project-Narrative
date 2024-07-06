package com.iread.backend.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "activity")
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "json_converted", nullable = false, columnDefinition = "LONGTEXT") //MYSQL
    private String jsonConverted;

    @Column(name = "img_preview", nullable = false, columnDefinition = "LONGTEXT") //MYSQL
    private String imgPreview;

    @OneToOne
    @JoinColumn(name = "story_id")
    @JsonIgnore
    private Story story;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<StudentActivity> studentActivities;

}