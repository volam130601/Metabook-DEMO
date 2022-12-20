package com.metabook.service.post;

import com.metabook.entity.Friend;
import com.metabook.entity.post.Post;
import com.metabook.repository.post.PostRepository;
import com.metabook.service.friend.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    FriendService friendService;

    @Override
    public Post save(Post post) {
        return postRepository.save(post);
    }

    @Override
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    @Override
    public Post findById(Long postId) {
        return postRepository.findById(postId).get();
    }

    @Override
    public List<Post> findPagePostByUserId(long userId, int page, int size) {
        List<Post> posts = postRepository.findByUserId(userId);
        friendService.findByUserId(userId)
                .stream().filter(Friend::isAccept)
                .forEach(item -> {
                    posts.addAll(postRepository.findByUserId(item.getOtherUser().getId()));
                });
        List<Post> postReversed = posts.stream()
                .sorted(Comparator.comparing(Post::getId).reversed())
                .collect(Collectors.toList());
        int start = page * size;
        int end = (page * size) + size;
        List<Post> result = new ArrayList<>();
        if (end > postReversed.size()) end = postReversed.size();
        for (int i = start; i < end; i++) {
            result.add(postReversed.get(i));
        }
        return result;
    }

    @Override
    public long countTotalPost(long userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        friendService.findByUserId(userId)
                .stream().filter(Friend::isAccept)
                .forEach(item -> {
                    posts.addAll(postRepository.findByUserId(item.getOtherUser().getId()));
                });
        return posts.size();
    }
}
