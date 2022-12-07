package com.metabook;

import com.metabook.entity.User;
import com.metabook.repository.RoleRepository;
import com.metabook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MetabookDemoApplication implements CommandLineRunner {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public static void main(String[] args) {
        SpringApplication.run(MetabookDemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findAll().size() < 1) {
            userRepository.save(User.builder().email("admin@gmail.com")
                    .password(passwordEncoder.encode("123123"))
                    .role(roleRepository.findByCode("ROLE_ADMIN"))
                    .build());
            System.out.println("Create account admin success!");
        }
    }

}
