package com.metabook.repository.comment;

import com.metabook.entity.comment.CommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Long countByCommentId(long commentId);

    @Transactional
    void deleteByUserIdAndCommentId(long userId, long commentId);

    boolean existsByUserIdAndCommentId(long userId, long commentId);

    List<CommentLike> findAllByUserId(long userId);
}
