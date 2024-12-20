package com.campusconnect.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import java.util.UUID;
import org.hibernate.annotations.GenericGenerator;



@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class User {



    // In your entity class:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;



    private String name;
    private String email;
    private String password;
    private  String CollegeName;

    private String dob; // Date of Birth
    private String address;
    private String city;
    private String contactNo;

    private String imageName; // Store the name of the image file (or the path if needed)
    private String imageType; // Optional: Store the MIME type of the image
}
