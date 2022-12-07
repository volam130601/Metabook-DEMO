package com.metabook.repository;

import com.metabook.entity.post.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    Long countPostLikeByPostId(long postId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM PostLike p WHERE p.user.id = ?1 and p.post.id = ?2")
    void dislikePostByUserId(long userId, long postId);

    boolean existsPostLikeByUserIdAndPostId(long userId, long postId);

    List<PostLike> findAllByUserId(long userId);
}
