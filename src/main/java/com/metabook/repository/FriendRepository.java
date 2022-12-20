package com.metabook.repository;

import com.metabook.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import javax.transaction.Transactional;
import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    List<Friend> findByUserId(long userId);

    List<Friend> findByOtherUserId(long otherUserId);

    boolean existsByUserIdAndOtherUserId(long userId, long otherUserId);

    @Modifying
    @Transactional
    void deleteByUserIdAndOtherUserId(long userId, long otherUserId);

    Friend findByUserIdAndOtherUserId(long userId, long otherUserId);
}
