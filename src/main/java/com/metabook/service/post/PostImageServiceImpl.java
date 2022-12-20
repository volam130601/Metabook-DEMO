package com.metabook.service.post;

import com.metabook.entity.post.PostImage;
import com.metabook.repository.post.PostImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostImageServiceImpl implements PostImageService {

    @Autowired
    PostImageRepository postImageRepository;

    @Override
    public boolean existsPostImageByImageAndPostId(String image, Long postId) {
        return postImageRepository.existsPostImageByImageAndPostId(image, postId);
    }

    @Override
    public Optional<PostImage> findByPostId(Long postId) {
        return postImageRepository.findByPostId(postId);
    }
}
