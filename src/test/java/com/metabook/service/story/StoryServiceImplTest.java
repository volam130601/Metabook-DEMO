package com.metabook.service.story;

import com.metabook.entity.Friend;
import com.metabook.entity.Story;
import com.metabook.repository.StoryRepository;
import com.metabook.repository.UserRepository;
import com.metabook.service.friend.FriendService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
class StoryServiceImplTest {
    @Autowired
    FriendService friendService;
    @Autowired
    UserRepository userRepository;

    @Autowired
    StoryRepository storyRepository;

    @Test
    void findAllPostWithFriendId() {
        List<Story> stories = storyRepository.findByUserId(1);
        friendService.findByUserId(1)
                .stream().filter(Friend::isAccept)
                .forEach(item -> {
                    stories.addAll(storyRepository.findByUserId(item.getOtherUser().getId()));
                });

        stories.stream()
                .sorted(Comparator.comparing(Story::getId).reversed())
                .collect(Collectors.toList())
                .forEach(item -> System.out.println(item.getUser().getId()));
    }

    @Test
    void findFriendIdByUSer() {
        friendService.findByUserId(1)
                .stream().filter(Friend::isAccept)
                .forEach(item -> System.out.println(item.getOtherUser().getId()));
    }

}