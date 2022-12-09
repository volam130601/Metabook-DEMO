package com.metabook.repository.post;

import com.metabook.entity.post.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostImageRepository extends JpaRepository<PostImage, Long> {
    @Query("SELECT p FROM PostImage p WHERE p.image = ?1 AND p.post.id = ?2")
    boolean existsPostImageByImageAndPostId(String image, Long postId);

    Optional<PostImage> findByPostId(Long postId);
}
