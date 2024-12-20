package com.campusconnect.service;

import com.campusconnect.Dao.UserDao;
import com.campusconnect.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserDao userRepository;

    private static final String UPLOAD_DIRECTORY = "uploads/users/";

    public ResponseEntity<String> registerUser(User user, MultipartFile profilePicture) throws IOException {
        // Generate a unique filename for the profile picture
        Optional<User> user1 = userRepository.findByEmail(user.getEmail());
        if (user1.isPresent()) {
            return new ResponseEntity<>("Email already exists", HttpStatus.CONFLICT);
        }
        String originalFilename = profilePicture.getOriginalFilename();
        String newFilename = UUID.randomUUID().toString() + "_" + originalFilename;

        // Create a directory for the user
        String userDirectory = UPLOAD_DIRECTORY + user.getEmail() + "/";
        File directory = new File(userDirectory);
        if (!directory.exists()) {
            directory.mkdirs(); // Create the directory if it doesn't exist
        }

        // Save the profile picture inside the user's directory
        Path filePath = Paths.get(userDirectory + newFilename);

        // Set the new filename in the user object
        user.setImageName(newFilename);
        user.setImageType(profilePicture.getContentType());

        try {
            // Write the image bytes to the specified file path
            Files.write(filePath, profilePicture.getBytes());
        } catch (IOException ex) {
            return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
        }

        // Save the user to the database
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    public ResponseEntity<String> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(email);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }
    }

    public ResponseEntity<Optional<User>> getUser(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }




}
