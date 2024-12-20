package com.campusconnect.Dao;


import com.campusconnect.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostDao extends JpaRepository<Post, Integer> {

    List<Post> findAllByOrderByDateTimeDesc();

    List<Post> findByCollegeEmailOrderByDateTimeDesc(String email);
}
