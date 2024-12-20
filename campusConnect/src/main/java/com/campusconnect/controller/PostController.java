package com.campusconnect.controller;


import com.campusconnect.Entity.Post;
import com.campusconnect.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://10.56.2.167:8081")
@RestController
@RequestMapping("/campus")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/home")
    public ResponseEntity<List<Map<String, Object>>> home() {
        List<Post> posts = postService.getHomePost();  // Fetch posts ordered by date


        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Map<String, Object>> postDetails = posts.stream().map(post -> {
            Map<String, Object> details = new HashMap<>();
            details.put("clgName",post.getCollege().getCollegeName());
            details.put("description", post.getDescription());
            details.put("dateTime", post.getDateTime());
            details.put("imagePath", "http://10.56.2.167:8080/"+postService.getImagePath(post));
            return details;
        }).collect(Collectors.toList());
         System.out.println(postDetails);
        return ResponseEntity.ok(postDetails);  // Return the post details as the response
    }


    @PostMapping("/addPost")
    public ResponseEntity<String> addPost(@RequestParam("email") String email,
                                          @RequestPart("description") String description,
                                          @RequestPart MultipartFile image) throws IOException {
        return postService.addPost(email,description,image);
    }
    @GetMapping("/posts/college/{collegeName}")
    public ResponseEntity<List<Map<String, Object>>> getPostsByCollegeName(@PathVariable String collegeName) {
        System.out.println(collegeName);
        List<Post> posts = postService.getPostsByCollegeName(collegeName);
        if (posts.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Map each post's details including the image path
        List<Map<String, Object>> postDetails = posts.stream().map(post -> {
            Map<String, Object> details = new HashMap<>();
            details.put("description", post.getDescription());
            details.put("dateTime", post.getDateTime());
            details.put("imagePath", "http://10.56.2.167:8080/"+postService.getImagePath(post));
            return details;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(postDetails);
    }
}
