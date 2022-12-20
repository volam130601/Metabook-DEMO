package com.metabook.service.user;

import com.metabook.entity.User;
import com.metabook.repository.RoleRepository;
import com.metabook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public int enableAccount(User user) {
        return 0;
    }

    @Override
    public User save(User user) {
        user.setUpdateAt(new Date());
        return userRepository.save(user);
    }

    @Override
    public User changePassword(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setUpdateAt(new Date());
        return userRepository.save(user);
    }

    @Override
    public boolean existsUserByEmail(String email) {
        return userRepository.existsUserByEmail(email);
    }

    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(roleRepository.findByCode("ROLE_USER"));
        user.setCreateAt(new Date());
        return userRepository.save(user);
    }


    @Override
    public List<User> searchByFullName(String fullName) {
        Pageable pageable = PageRequest.of(0, 5);
        if (fullName != null) {
            return userRepository.findAllByFullNameContaining(fullName, pageable).getContent();
        }
        return null;
    }

    @Override
    public User findById(long userId) {
        return userRepository.findById(userId).get();
    }

    @Override
    public boolean existsByPassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }

}
