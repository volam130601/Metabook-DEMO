package com.metabook.service.friend;

import com.metabook.entity.Friend;
import com.metabook.entity.User;
import com.metabook.repository.FriendRepository;
import com.metabook.repository.UserRepository;
import com.metabook.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
class FriendServiceTest {
    @Autowired
    FriendRepository friendRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @Autowired
    private FriendService friendService;

    @Test
    void findAll() {
        Iterable friends = friendRepository.findAll();
        assertThat(friends).isNotEmpty();
    }

    @Test
    void save() {
        Friend friend = Friend.builder()
                .user(userRepository.findById(3L).get())
                .otherUser(userRepository.findById(4L).get())
                .build();
        System.out.println(friendRepository.save(friend));
    }

    @Test
    void acceptAddFriend() {
        Friend friend = friendRepository.findByUserIdAndOtherUserId(3, 4);
        friend.setAccept(true);
        friendRepository.save(friend);
    }

    @Test
    void findByUserId() {
        friendRepository.findByUserId(1L).forEach(item -> System.out.println(item.getUser().getId() + " | " + item.getOtherUser().getId()));
    }

    @Test
    void exist() {
        System.out.println(friendRepository.findByUserIdAndOtherUserId(1, 2).isAccept());
        System.out.println(friendRepository.findByUserIdAndOtherUserId(3, 4).isAccept());
    }

    @Test
    void remove() {
        if (friendRepository.existsByUserIdAndOtherUserId(3, 4)) {
            friendRepository.deleteByUserIdAndOtherUserId(3, 4);
        }
    }

    @Test
    void getFriendAcceptFalse() {
        List<Friend> friends = friendRepository.findByOtherUserId(7);
        for (Friend friend : friends) {
            System.out.println(friend.getUser().getId());
        }
    }

    @Test
    void getFirstFriendAcceptFalse() {
        List<User> users = friendService.getFriendAcceptFalse(7);
        System.out.println(users.size());

    }
}