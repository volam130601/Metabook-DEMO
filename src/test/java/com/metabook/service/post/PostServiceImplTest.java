package com.metabook.service.post;

import com.metabook.entity.post.Post;
import com.metabook.entity.post.PostImage;
import com.metabook.repository.post.PostImageRepository;
import com.metabook.repository.post.PostRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;

@SpringBootTest
@RunWith(SpringRunner.class)
class PostServiceImplTest {

    @Autowired
    PostRepository postRepository;

    @Autowired
    PostImageRepository postImageRepository;

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
}