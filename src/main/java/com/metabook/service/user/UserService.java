package com.metabook.service.user;

import com.metabook.entity.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User register(User user);

    int enableAccount(User user);
}
