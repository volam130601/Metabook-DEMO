package com.metabook.service.friend;

import com.metabook.entity.Friend;
import com.metabook.repository.FriendRepository;
import com.metabook.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
class FriendServiceTest {
    @Autowired
    FriendRepository friendRepository;

    @Autowired
    UserRepository userRepository;

    @Test
    void findAll() {
        Iterable friends = friendRepository.findAll();
        assertThat(friends).isEmpty();
    }

    @Test
    void save() {
        Friend friend = Friend.builder()
                .user(userRepository.findById(2L).get())
                .otherUser(userRepository.findById(4L).get())
                .build();
        System.out.println(friendRepository.save(friend));
    }

    @Test
    void count() {
    }

    @Test
    void findByUserId() {
        friendRepository.findByUserId(1L).forEach(item -> System.out.println(item.getOtherUser().getId()));
    }
}