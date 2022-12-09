package com.metabook.service.post;

import com.metabook.entity.post.PostLike;
import com.metabook.repository.post.PostLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostLikeServiceImpl implements PostLikeService {

    @Autowired
    PostLikeRepository postLikeRepository;

    @Override
    public PostLike save(PostLike postLike) {
        return postLikeRepository.save(postLike);
    }


    @Override
    public Long countPostLikeByPostId(long postId) {
        return postLikeRepository.countPostLikeByPostId(postId);
    }

    @Override
    public void dislikePostByUserId(long userId, long postId) {
        postLikeRepository.dislikePostByUserId(userId, postId);
    }

    @Override
    public boolean existsPostLikeByUserIdAndPostId(long userId, long postId) {
        return postLikeRepository.existsPostLikeByUserIdAndPostId(userId, postId);
    }

    @Override
    public List<PostLike> findAllByUserId(long userId) {
        return postLikeRepository.findAllByUserId(userId);
    }

}
