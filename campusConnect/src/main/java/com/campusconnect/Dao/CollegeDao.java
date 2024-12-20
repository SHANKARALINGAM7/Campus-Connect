package com.campusconnect.Dao;


import com.campusconnect.Entity.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CollegeDao extends JpaRepository<College, String> {



    Optional<College> findByCollegeCode(String collegeCode);

    Optional<College> findByEmail(String email);

    Optional<College> findByCollegeName(String collegeName);
}
