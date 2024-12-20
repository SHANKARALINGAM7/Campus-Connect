package com.campusconnect.service;


import com.campusconnect.Dao.PostDao;
import com.campusconnect.Entity.College;
import com.campusconnect.Entity.Post;
import lombok.RequiredArgsConstructor;
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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostDao postDao;
    private final CollegeService collegeService;

    private static final String UPLOAD_DIRECTORY = "uploads/post/";
    public List<Post> getHomePost() {
        return postDao.findAllByOrderByDateTimeDesc();
    }

    public ResponseEntity<String> addPost(String email, String description, MultipartFile image) throws IOException {
        Post post = new Post();
        String originalFilename = image.getOriginalFilename();
        String newFilename = UUID.randomUUID().toString() + "_" + originalFilename;

        // Create a directory for the user
        String userDirectory = UPLOAD_DIRECTORY + email + "/";
        File directory = new File(userDirectory);
        if (!directory.exists()) {
            directory.mkdirs(); // Create the directory if it doesn't exist
        }


        Path filePath = Paths.get(userDirectory + newFilename);

        post.setImageName(newFilename);
        post.setImageType(image.getContentType());
        post.setDescription(description);
        post.setDateTime(LocalDateTime.now());
        College college = collegeService.getUser(email).getBody().get();
        post.setCollege(college);
           try {
            // Write the image bytes to the specified file path
            Files.write(filePath, image.getBytes());
        } catch (IOException ex) {
            return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
        }

        postDao.save(post);
        return ResponseEntity.ok(" Image uploaded successfully.");

    }

    public List<Post> getPostsByCollegeName(String collegeName) {
        Optional<College> collegeOptional = collegeService.findCollegeByName(collegeName).getBody();
        if (collegeOptional.isEmpty()) {
            return List.of(); // Return an empty list if college not found
        }
        College college = collegeOptional.get();
        return postDao.findByCollegeEmailOrderByDateTimeDesc(college.getEmail());
    }

    public String getImagePath(Post post) {
        return UPLOAD_DIRECTORY + post.getCollege().getEmail() + "/" + post.getImageName();
    }


}
