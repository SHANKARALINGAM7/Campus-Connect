package com.campusconnect.service;

import com.campusconnect.Dao.CollegeDao;
import com.campusconnect.Entity.College;
import com.campusconnect.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class CollegeService {
    private static final String UPLOAD_DIRECTORY = "uploads/colleges/";
    @Autowired
    private CollegeDao collegeDao;

    public ResponseEntity<String> loginUser(String email, String password) {
        Optional<College> isEmailExist = collegeDao.findByEmail(email);
        if(isEmailExist.isPresent() && isEmailExist.get().getPassword().equals(password)) {
            return new ResponseEntity<>(email, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<String> registerCollege(String collegeName, String collegeCode, String contactNo, String address, String email, String password, MultipartFile profilePicture, MultipartFile verificationPic) {

        Optional<College> isEmailExist = collegeDao.findByEmail(email);
        Optional<College> isCollegeExist = collegeDao.findByCollegeCode(collegeCode);
        if(isEmailExist.isPresent()) {
            return new ResponseEntity<>("Email  already exists", HttpStatus.CONFLICT);
        }
        else if(isCollegeExist.isPresent()) {
            return new ResponseEntity<>("College code already exists", HttpStatus.CONFLICT);
        }
        String originalProfilePicFilename = profilePicture.getOriginalFilename();
        String newProfilePicFilename = UUID.randomUUID().toString() + "_" + originalProfilePicFilename;

        String originalVerPicFilename = verificationPic.getOriginalFilename();
        String newVerPicFilename = UUID.randomUUID().toString() + "_" + originalVerPicFilename;

        String userDirectory = UPLOAD_DIRECTORY + email + "/";
        File directory = new File(userDirectory);
        if (!directory.exists()) {
            directory.mkdirs(); // Create the directory if it doesn't exist
        }

        Path filePath = Paths.get(userDirectory + newProfilePicFilename);
        Path filePath1 = Paths.get(userDirectory + newVerPicFilename);

        try {
            // Write the image bytes to the specified file path
            Files.write(filePath, profilePicture.getBytes());
            Files.write(filePath1, verificationPic.getBytes());
        } catch (IOException ex) {
            return new ResponseEntity<>("Image is not uploaded", HttpStatus.BAD_REQUEST);
        }


        College college = new College();
        college.setCollegeName(collegeName);
        college.setCollegeCode(collegeCode);
        college.setContactNo(contactNo);
        college.setAddress(address);
        college.setEmail(email);
        college.setPassword(password);
        college.setProfileImageName(newProfilePicFilename);
        college.setProfileImageType(profilePicture.getContentType());
        college.setVerImageName(newVerPicFilename);
        college.setVerImageType(verificationPic.getContentType());
        collegeDao.save(college);

        return ResponseEntity.ok("College registered successfully.");
    }

    public ResponseEntity<Optional<College>> getUser( String email) {
        Optional<College> isEmailExist = collegeDao.findByEmail(email);
        if (isEmailExist.isPresent()) {
            return ResponseEntity.ok(isEmailExist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Optional<College>> findCollegeByName(String collegeName) {
        Optional<College> college = collegeDao.findByCollegeName(collegeName);
        return college.isPresent() ? ResponseEntity.ok(college) : ResponseEntity.notFound().build();
    }
}

