package com.metabook.repository;

import com.metabook.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByEmailOrPhoneNumber(String email, Integer phoneNumber);

    boolean existsUserByEmail(String email);


    Page<User> findAllByFullNameContaining(String fullName, Pageable pageable);

}
