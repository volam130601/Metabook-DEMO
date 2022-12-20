package com.metabook.controller.web;

import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.dto.comment.CommentLikeDto;
import com.metabook.entity.comment.Comment;
import com.metabook.entity.comment.CommentLike;
import com.metabook.repository.comment.CommentLikeRepository;
import com.metabook.repository.comment.CommentRepository;
import com.metabook.repository.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.metabook.controller.web.UserController.getUser;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentLikeRepository commentLikeRepository;

    @GetMapping("/create/{postId}")
    public ResponseEntity<ResponseObject> createCommentByPostId(@PathVariable("postId") long postId,
                                                                @RequestParam("content") String content) {
        return ResponseEntity.ok(
                new ResponseObject(commentRepository.save(Comment.builder()
                        .content(content)
                        .user(getUser())
                        .post(postRepository.findById(postId).get())
                        .createAt(new Date())
                        .build()),
                        "Create Comment in post id: " + postId, StatusCode.SUCCESS)
        );
    }

    @GetMapping("/get/{postId}")
    public ResponseEntity<ResponseObject> getPageByPostId(@PathVariable("postId") long postId,
                                                          @RequestParam("page") int page,
                                                          @RequestParam("size") int size) {
        List<Comment> comments = commentRepository.findByPostId(postId,
                PageRequest.of(page, size, Sort.by("createAt").descending())).toList();
        for (Comment comment : comments) {
            comment.setTotalCommentLike(commentLikeRepository.countByCommentId(comment.getId()));
        }
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .data(comments)
                        .message("Get comment page :" + page + " have 3 size")
                        .status(StatusCode.SUCCESS)
                        .totalData(commentRepository.countByPostId(postId))
                        .build()
        );
    }

    @GetMapping("/like/{id}")
    public ResponseEntity<ResponseObject> likeByCommentId(@PathVariable("id") long commentId) {
        if (!commentLikeRepository.existsByUserIdAndCommentId(getUser().getId(), commentId)) {
            commentLikeRepository.save(
                    CommentLike.builder()
                            .user(getUser())
                            .comment(commentRepository.findById(commentId).get()).build()
            );
            return ResponseEntity.ok(
                    new ResponseObject(commentLikeRepository.countByCommentId(commentId),
                            "Like comment id: " + commentId + ", user :" + getUser().getFullName(),
                            StatusCode.SUCCESS)
            );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "Like comment is failed", StatusCode.FAILED)
        );
    }

    @GetMapping("/dislike/{id}")
    public ResponseEntity<ResponseObject> dislikeByCommentId(@PathVariable("id") long commentId) {
        if (commentLikeRepository.existsByUserIdAndCommentId(getUser().getId(), commentId)) {
            commentLikeRepository.deleteByUserIdAndCommentId(getUser().getId(), commentId);
            return ResponseEntity.ok(
                    new ResponseObject(commentLikeRepository.countByCommentId(commentId),
                            "Dislike comment id " + commentId + " is success", StatusCode.SUCCESS)
            );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "Dislike comment is failed", StatusCode.FAILED)
        );
    }

    @GetMapping("/user-like-comment")
    public ResponseEntity<ResponseObject> userLikeComment() {
        return ResponseEntity.ok(
                new ResponseObject(commentLikeRepository.findAllByUserId(getUser().getId()),
                        "Get user like comment is Success", StatusCode.SUCCESS)
        );
    }

    @PostMapping(value = "/count-like-comment", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseObject> getCountLikeComment(@RequestBody List<String> ids) {
        List<CommentLikeDto> commentLikeDtos = new ArrayList<>();
        ids.forEach(id -> {
            long commentId = Long.parseLong(id);
            commentLikeDtos.add(CommentLikeDto.builder()
                    .commentId(commentId)
                    .totalLike(commentLikeRepository.countByCommentId(commentId))
                    .build());
        });
        return ResponseEntity.ok(
                new ResponseObject(commentLikeDtos,
                        "Get user like comment is Success", StatusCode.SUCCESS)
        );
    }
}
