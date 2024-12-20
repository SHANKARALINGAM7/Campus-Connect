package com.campusconnect.controller;



import com.campusconnect.Entity.College;
import com.campusconnect.Entity.User;
import com.campusconnect.service.CollegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://10.56.2.167:8081")
@RestController
@RequestMapping("/campus")
public class CollegeController {

    @Autowired
    private CollegeService collegeService;


    @PostMapping("/college-signup")
    public ResponseEntity<String> registerCollege(
            @RequestParam("collegeName") String collegeName,
            @RequestParam("collegeCode") String collegeCode,
            @RequestParam("contactNo") String contactNo,
            @RequestParam("address") String address,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("profilePicture") MultipartFile profilePicture,
            @RequestParam("verificationPic") MultipartFile verificationPic
    ) {
        // Call the service to handle the registration logic
        System.out.println(collegeName+" "+collegeCode+" "+contactNo+" "+address+" "+email+" "+password);
        return collegeService.registerCollege(collegeName, collegeCode, contactNo, address, email, password, profilePicture, verificationPic);
    }


    @PostMapping("/college-login")
    public ResponseEntity<String> loginCollege(@RequestBody Map<String, String> loginData)
    {   String email = loginData.get("email");
        String password = loginData.get("password");
        System.out.println(email+" "+password);
        return collegeService.loginUser(email,password);

    }

    @GetMapping("/college-profile-pic")
    public ResponseEntity<Map<String, String>> getUserProfilePic(@RequestParam String email) {
        System.out.println("hrlllooo");
        // Get the User object from the database
        Optional<College> userOptional = collegeService.getUser(email).getBody(); // Ensure you have a method to get the user by email
        System.out.println(userOptional.get().getEmail());
        College college = userOptional.get();
        String imageName = college.getProfileImageName();
        String name = college.getCollegeName();
        String profilePicUrl;

        if (imageName != null) {
            // Construct the URL to access the profile picture
            profilePicUrl = "http://10.56.2.167:8080/uploads/colleges/" + email + "/" + imageName; // Make sure to adjust the path accordingly
            Map<String, String> response = new HashMap<>();
            response.put("profilePicUrl", profilePicUrl);
            response.put("name", name);
            response.put("email", email);
            response.put("collegeCode", college.getCollegeCode());
            response.put("contactNo", college.getContactNo());
            response.put("address", college.getAddress());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
