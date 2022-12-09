package com.metabook.repository;

import com.metabook.entity.comment.Comment;
import com.metabook.repository.comment.CommentRepository;
import com.metabook.repository.post.PostRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@SpringBootTest
@RunWith(SpringRunner.class)
class CommentRepositoryTest {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    @Test
    void save() {
        Assert.assertNotNull(
                commentRepository.save(Comment.builder()
                        .content("hi bro ddsds")
                        .user(userRepository.findById(1L).get())
                        .post(postRepository.findById(2L).get())
                        .createAt(new Date())
                        .build())
        );


    }

    @Test
    void postComment() {
        commentRepository.findByPostIdOrderByCreateAtDesc(2L).forEach(item -> System.out.println(item.getId()));
    }

    @Test
    void countCommentByPost() {
        System.out.println(commentRepository.countByPostId(2));
    }

    @Test
    void getPageble() {
        int page = 0;
        Page<Comment> commentList = commentRepository.findByPostId(2, PageRequest.of(page, 3, Sort.by("createAt").descending()));
        for (Comment comment : commentList.toList()) {
            System.out.println(comment.getId());
        }
    }
}