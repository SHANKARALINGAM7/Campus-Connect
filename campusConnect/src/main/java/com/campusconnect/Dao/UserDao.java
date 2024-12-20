package com.campusconnect.Dao;


import com.campusconnect.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserDao extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByName(String name);


}
