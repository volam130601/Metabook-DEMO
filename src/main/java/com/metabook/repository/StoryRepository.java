package com.metabook.repository;

import com.metabook.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story, Long> {
    boolean existsStoryByImage(String image);

    @Query("select s from Story s ORDER BY s.createAt DESC")
    List<Story> findAllReverse();


    List<Story> findByUserId(long userId);
}
