package com.metabook.service.post;

import com.metabook.entity.post.Post;
import com.metabook.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;

    Post save(Post post) {
        return postRepository.save(post);
    }
}
