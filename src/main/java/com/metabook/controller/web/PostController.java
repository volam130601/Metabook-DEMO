package com.metabook.controller.web;

import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.entity.post.Post;
import com.metabook.entity.post.PostImage;
import com.metabook.entity.post.PostLike;
import com.metabook.repository.PostImageRepository;
import com.metabook.repository.PostLikeRepository;
import com.metabook.repository.PostRepository;
import com.metabook.util.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.metabook.controller.web.LoginController.getUser;

@RestController()
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    PostRepository postRepository;
    @Autowired
    PostImageRepository postImageRepository;

    @Autowired
    PostLikeRepository postLikeRepository;


    @PostMapping("/create")
    public ResponseEntity<ResponseObject> postCreate(@RequestParam("file") MultipartFile[] fileList,
                                                     @RequestParam("content") String content) throws IOException {
        Post post = Post.builder()
                .content(content)
                .user(getUser())
                .createAt(new Date())
                .build();
        post = postRepository.save(post);
        List<PostImage> postImages = new ArrayList<>();
        for (MultipartFile multipartFile : fileList) {
            String fileName = multipartFile.getOriginalFilename();
            postImages.add(PostImage.builder().image(fileName).post(post).build());
            String uploadDir = "post/" + post.getId();
            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
        }
        post.setPostImages(postImages);
        postRepository.save(post);
        return ResponseEntity.ok(
                new ResponseObject(null, "Post create is success", StatusCode.SUCCESS)
        );
    }

    //Haven't done
    @GetMapping("/getTop2")
    public ResponseEntity<ResponseObject> getPostTop2() {
        return ResponseEntity.ok(
                new ResponseObject(postRepository.findAll(), "GET Post News is success", StatusCode.SUCCESS)
        );
    }

    //Haven't done
    @GetMapping("/getAll")
    public ResponseEntity<ResponseObject> getPostAll() {
        List<Post> postList = postRepository.findAll();
        for (Post post : postList) {
            post.setCountLikes(postLikeRepository.countPostLikeByPostId(post.getId()));
        }
        return ResponseEntity.ok(
                new ResponseObject(postList, "GET Post News is success", StatusCode.SUCCESS)
        );
    }

    @GetMapping("/like/{postId}")
    public ResponseEntity<ResponseObject> likeByPostId(@PathVariable("postId") Long postId) {
        if (!postLikeRepository.existsPostLikeByUserIdAndPostId(getUser().getId(), postId)) {
            postLikeRepository.save(PostLike.builder()
                    .user(getUser())
                    .post(postRepository.findById(postId).get())
                    .build());
            return ResponseEntity.ok(
                    new ResponseObject(postLikeRepository.countPostLikeByPostId(postId), "Like post is success", StatusCode.SUCCESS)
            );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "Like post is failed", StatusCode.FAILED)
        );
    }

    @GetMapping("/dislike/{postId}")
    public ResponseEntity<ResponseObject> dislikeByPostId(@PathVariable("postId") Long postId) {
        if (postLikeRepository.existsPostLikeByUserIdAndPostId(getUser().getId(), postId)) {
            postLikeRepository.dislikePostByUserId(getUser().getId(), postId);
            return ResponseEntity.ok(
                    new ResponseObject(postLikeRepository.countPostLikeByPostId(postId), "Dislike post is success", StatusCode.SUCCESS)
            );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "Like post is failed", StatusCode.FAILED)
        );
    }

    @GetMapping("/user-like-post")
    public ResponseEntity<ResponseObject> userLikePost() {
        return ResponseEntity.ok(
                new ResponseObject(postLikeRepository.findAllByUserId(getUser().getId()), "Get user like post is Success", StatusCode.SUCCESS)
        );
    }


}
