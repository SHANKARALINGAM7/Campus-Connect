package com.campusconnect.controller;

import com.campusconnect.Entity.User;
import com.campusconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:8081")
@CrossOrigin(origins = "http://10.56.2.167:8081")
@RestController
@RequestMapping("/campus")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/user-signup")
    public ResponseEntity<String> registerUser(@RequestPart User user, @RequestPart MultipartFile profilePicture) throws IOException {
       System.out.println(user.toString());
       System.out.println(profilePicture.getBytes()+" "+profilePicture.getContentType()+" "+profilePicture.getOriginalFilename());
        return userService.registerUser(user, profilePicture);
    }

    @PostMapping("/user-login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        
        return userService.loginUser(email, password);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable String email) {
        return userService.getUser(email);
    }

    @GetMapping("/user-profile-pic")
    public ResponseEntity<Map<String, String>> getUserProfilePic(@RequestParam String email) {
        // Get the User object from the database
        Optional<User> userOptional = userService.getUser(email).getBody(); // Ensure you have a method to get the user by email
        System.out.println(userOptional.get().getEmail());
        User user = userOptional.get();
        String imageName = user.getImageName();
        String name = user.getName();
        // Get the UUID-based filename from the User object
        String profilePicUrl;

        if (imageName != null) {
            // Construct the URL to access the profile picture
            profilePicUrl = "http://10.56.2.167:8080/uploads/users/" + email + "/" + imageName; // Make sure to adjust the path accordingly
            Map<String, String> response = new HashMap<>();
            response.put("profilePicUrl", profilePicUrl);
            response.put("name", name);
            response.put("email", user.getEmail());
            response.put("address", user.getAddress());
            response.put("contactNo", user.getContactNo());
            response.put("city", user.getCity());
            response.put("dob", user.getDob());
            response.put("collegeName",user.getCollegeName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
