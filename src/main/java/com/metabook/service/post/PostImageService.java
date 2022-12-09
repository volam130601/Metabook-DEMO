package com.metabook.service.post;

import com.metabook.entity.post.PostImage;

import java.util.Optional;

public interface PostImageService {
    boolean existsPostImageByImageAndPostId(String image, Long postId);

    Optional<PostImage> findByPostId(Long postId);
}
