package com.metabook.controller.web;

import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.entity.post.Post;
import com.metabook.entity.post.PostImage;
import com.metabook.entity.post.PostLike;
import com.metabook.repository.comment.CommentRepository;
import com.metabook.service.post.PostLikeService;
import com.metabook.service.post.PostService;
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

@RestController
@RequestMapping("/api/post")
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private PostLikeService postLikeService;

    @Autowired
    private CommentRepository commentRepository;

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> postCreate(@RequestParam("file") MultipartFile[] fileList,
                                                     @RequestParam("content") String content) throws IOException {
        Post post = Post.builder()
                .content(content)
                .user(getUser())
                .createAt(new Date())
                .build();
        post = postService.save(post);
        List<PostImage> postImages = new ArrayList<>();
        for (MultipartFile multipartFile : fileList) {
            String fileName = multipartFile.getOriginalFilename();
            postImages.add(PostImage.builder().image(fileName).post(post).build());
            String uploadDir = "post/" + post.getId();
            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
        }
        post.setPostImages(postImages);
        postService.save(post);
        return ResponseEntity.ok(
                new ResponseObject(null, "Post create is success", StatusCode.SUCCESS)
        );
    }

    //Haven't done
    @GetMapping("/getTop2")
    public ResponseEntity<ResponseObject> getPostTop2() {
        return ResponseEntity.ok(
                new ResponseObject(postService.findAll(), "GET Post News is success", StatusCode.SUCCESS)
        );
    }

    //Haven't done
    @GetMapping("/getAll")
    public ResponseEntity<ResponseObject> getPostAll() {
        List<Post> postList = postService.findAll();
        for (Post post : postList) {
            post.setCountLikes(postLikeService.countPostLikeByPostId(post.getId()));
            post.setCountComments(commentRepository.countByPostId(post.getId()));
        }
        return ResponseEntity.ok(
                new ResponseObject(postList, "GET Post News is success", StatusCode.SUCCESS)
        );
    }

    @GetMapping("/like/{postId}")
    public ResponseEntity<ResponseObject> likeByPostId(@PathVariable("postId") Long postId) {
        if (!postLikeService.existsPostLikeByUserIdAndPostId(getUser().getId(), postId)) {
            postLikeService.save(PostLike.builder()
                    .user(getUser())
                    .post(postService.findById(postId))
                    .build());
            return ResponseEntity.ok(
                    new ResponseObject(postLikeService.countPostLikeByPostId(postId), "Like post is success", StatusCode.SUCCESS)
            );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "Like post is failed", StatusCode.FAILED)
        );
    }

    @GetMapping("/dislike/{postId}")
    public ResponseEntity<ResponseObject> dislikeByPostId(@PathVariable("postId") Long postId) {
        if (postLikeService.existsPostLikeByUserIdAndPostId(getUser().getId(), postId)) {
            postLikeService.dislikePostByUserId(getUser().getId(), postId);
            return ResponseEntity.ok(
                    new ResponseObject(postLikeService.countPostLikeByPostId(postId), "Dislike post is success", StatusCode.SUCCESS)
            );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "Like post is failed", StatusCode.FAILED)
        );
    }

    @GetMapping("/user-like-post")
    public ResponseEntity<ResponseObject> userLikePost() {
        return ResponseEntity.ok(
                new ResponseObject(postLikeService.findAllByUserId(getUser().getId()), "Get user like post is Success", StatusCode.SUCCESS)
        );
    }


}
