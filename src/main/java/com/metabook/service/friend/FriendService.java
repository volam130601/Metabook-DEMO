package com.metabook.service.friend;

import com.metabook.entity.Friend;
import com.metabook.entity.User;
import org.springframework.data.domain.Example;

import java.util.List;

public interface FriendService {
    List<Friend> findAll();

    <S extends Friend> S save(S entity);

    <S extends Friend> long count(Example<S> example);

    List<Friend> findByUserId(long userId);

    List<User> getFriendAcceptFalse(long otherUserId);

    boolean existsByUserIdAndOtherUserId(long userId, long otherUserId);

    Friend findByUserIdAndOtherUserId(long userId, long otherUserId);

    void deleteByUserIdAndOtherUserId(long userId, long otherUserId);
}
