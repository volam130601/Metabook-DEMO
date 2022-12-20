package com.metabook.service.story;

import com.metabook.entity.Story;

import java.util.List;

public interface StoryService {
    List<Story> findAllStoryByUserId(long userId);

    <S extends Story> S save(S entity);

    boolean existsStoryByImage(String image);
}
