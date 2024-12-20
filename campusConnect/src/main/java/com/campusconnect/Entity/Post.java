package com.campusconnect.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity

public class Post {


    // In your entity class:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private LocalDateTime dateTime;
    @Column(length = 2000)
    private String description;

    private String imageName;
    private String imageType;
    @ManyToOne
    @JoinColumn(name = "college_email")
    private College college;  // Reference to the College that posted
}
