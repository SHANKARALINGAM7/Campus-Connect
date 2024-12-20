package com.campusconnect.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class  College {


    // In your entity class:

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String collegeName;
    @Id
    private String email;
    private String password;
    private String collegeCode;
    private String contactNo;
    private String address;
    private String profileImageName;
    private String profileImageType;

    private String verImageName;
    private String verImageType;

    @OneToMany(mappedBy = "college")
    private List<Post> posts;  // One college can have multiple posts
}
