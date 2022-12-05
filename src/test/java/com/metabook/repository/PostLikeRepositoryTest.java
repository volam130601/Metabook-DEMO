package com.metabook.repository;

import com.metabook.entity.post.PostLike;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
class PostLikeRepositoryTest {

    @Autowired
    PostLikeRepository postLikeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;

    @Test
    void save() {
        Assert.assertNotNull(postLikeRepository.save(PostLike.builder()
                .user(userRepository.findById(2L).get())
                .post(postRepository.findById(2L).get())
                .build()));
        Assert.assertNotNull(postLikeRepository.save(PostLike.builder()
                .user(userRepository.findById(2L).get())
                .post(postRepository.findById(3L).get())
                .build()));

    }

    @Test
    void like() {
        Assert.assertNotNull(postLikeRepository.save(PostLike.builder()
                .user(userRepository.findById(2L).get())
                .post(postRepository.findById(3L).get())
                .build()));
    }

    @Test
    void dislike() {
//        postLikeRepository.dislikePostByUserId(1, 2);
        System.out.println(postLikeRepository.countPostLikeByPostId(2));
    }

    @Test
    void countPostLike() {
        System.out.println(postLikeRepository.countPostLikeByPostId(2));
    }
}