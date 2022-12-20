package com.metabook.service.story;

import com.metabook.entity.Friend;
import com.metabook.entity.Story;
import com.metabook.repository.StoryRepository;
import com.metabook.service.friend.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    StoryRepository storyRepository;
    @Autowired
    FriendService friendService;


    @Override
    public List<Story> findAllStoryByUserId(long userId) {
        List<Story> stories = storyRepository.findByUserId(userId);
        friendService.findByUserId(userId)
                .stream().filter(Friend::isAccept)
                .forEach(item -> {
                    stories.addAll(storyRepository.findByUserId(item.getOtherUser().getId()));
                });
        return stories.stream()
                .sorted(Comparator.comparing(Story::getId).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public <S extends Story> S save(S entity) {
        return storyRepository.save(entity);
    }

    @Override
    public boolean existsStoryByImage(String image) {
        return storyRepository.existsStoryByImage(image);
    }
}
