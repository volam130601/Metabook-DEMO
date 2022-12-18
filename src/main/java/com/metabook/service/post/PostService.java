package com.metabook.service.post;

import com.metabook.entity.post.Post;

import java.util.List;

public interface PostService {
    Post save(Post post);

    List<Post> findAll();

    Post findById(Long postId);


    List<Post> findPagePostByUserId(long userId, int page, int size);

    long countTotalPost(long userId);
}
