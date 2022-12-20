package com.metabook.repository.comment;

import com.metabook.entity.comment.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPostIdOrderByCreateAtDesc(long postId);

    long countByPostId(long postId);

    Page<Comment> findByPostId(long postId, Pageable pageable);

}
