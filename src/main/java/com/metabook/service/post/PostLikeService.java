package com.metabook.service.post;

import com.metabook.entity.post.PostLike;

import java.util.List;

public interface PostLikeService {
    PostLike save(PostLike postLike);

    Long countPostLikeByPostId(long postId);

    void dislikePostByUserId(long userId, long postId);

    boolean existsPostLikeByUserIdAndPostId(long userId, long postId);

    List<PostLike> findAllByUserId(long userId);
}
