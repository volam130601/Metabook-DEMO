package com.metabook.service.post;

import com.metabook.entity.Friend;
import com.metabook.entity.post.Post;
import com.metabook.entity.post.PostImage;
import com.metabook.repository.post.PostImageRepository;
import com.metabook.repository.post.PostRepository;
import com.metabook.service.friend.FriendService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
@RunWith(SpringRunner.class)
class PostServiceImplTest {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostImageRepository postImageRepository;
    @Autowired
    PostService postService;
    @Autowired
    FriendService friendService;

    @Test
    void save() {
        Post post = Post.builder().content("Hello girl").build();
        post.setPostImages(Arrays.asList(
                PostImage.builder().image("image1").post(post).build(),
                PostImage.builder().image("image2").post(post).build(),
                PostImage.builder().image("image3").post(post).build()
        ));
        Assert.assertNotNull(postRepository.saveAndFlush(post));
    }

    @Test
    void deleteById() {
        postRepository.deleteById(1L);
    }

    @Test
    void getImage() {
        for (Post post : postRepository.findAll()) {
            System.out.println(post.getPostImages().get(1).getImagePath(post.getId()));
        }
    }

    @Test
    void getTop2() {
        postService.findAll().forEach(item -> System.out.println(item.getId()));
    }

    void findPagePostByUserIdAndFriendId(int page, int size) {
        List<Post> posts = postRepository.findByUserId(1);
        friendService.findByUserId(1)
                .stream().filter(Friend::isAccept)
                .forEach(item -> {
                    posts.addAll(postRepository.findByUserId(item.getOtherUser().getId()));
                });
        List<Post> postReversed = posts.stream()
                .sorted(Comparator.comparing(Post::getId).reversed())
                .collect(Collectors.toList());
        int start = page * size;
        int end = (page * size) + size;
        System.out.println(start + " | " + end);
        List<Post> posts1 = new ArrayList<>();
        if (end > postReversed.size()) end = postReversed.size();
        for (int i = start; i < end; i++) {
            posts1.add(postReversed.get(i));
        }
        posts1.forEach(item -> System.out.println(item.getId()));
    }

    @Test
    void test1() {
        for (int i = 0; i < 5; i++) {
            findPagePostByUserIdAndFriendId(i, 3);
        }
    }
}