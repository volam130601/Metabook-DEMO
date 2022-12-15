package com.metabook.service.user;

import com.metabook.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findByEmail(String email);

    int enableAccount(User user);

    User register(User user);

    User save(User user);

    User changePassword(User user);

    boolean existsUserByEmail(String email);

}
