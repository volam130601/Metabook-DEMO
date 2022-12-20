package com.metabook.service.comment;

import com.metabook.entity.comment.CommentLike;
import com.metabook.repository.UserRepository;
import com.metabook.repository.comment.CommentLikeRepository;
import com.metabook.repository.comment.CommentRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
class CommentLikeServiceTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @Test
    void save() {
//        Assert.assertNotNull(commentLikeRepository.save(
//                CommentLike.builder()
//                        .user(userRepository.findById(2L).get())
//                        .comment(commentRepository.findById(22L).get()).build()
//        ));
        Assert.assertNotNull(commentLikeRepository.save(
                CommentLike.builder()
                        .user(userRepository.findById(2L).get())
                        .comment(commentRepository.findById(21L).get()).build()
        ));
    }

    @Test
    void countCommentLikeByCommentId() {
        System.out.println(commentLikeRepository.countByCommentId(22L));
    }

    @Test
    void deleteCommentLikeByUserIdAndPostId() {
//        commentLikeRepository.deleteByUserIdAndCommentId(2, 22L);
    }

    @Test
    void existsCommentLikeByUserIdAndPostId() {
        System.out.println(commentLikeRepository.existsByUserIdAndCommentId(3, 22));
    }

    @Test
    void findAllByUserId() {
        for (CommentLike commentLike : commentLikeRepository.findAllByUserId(2)) {
            System.out.println(commentLike.getId());
        }
    }
}