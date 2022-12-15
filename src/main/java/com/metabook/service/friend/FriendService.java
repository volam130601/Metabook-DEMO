package com.metabook.service.friend;

import com.metabook.entity.Friend;
import org.springframework.data.domain.Example;

import java.util.List;

public interface FriendService {
    List<Friend> findAll();

    <S extends Friend> S save(S entity);

    <S extends Friend> long count(Example<S> example);

    List<Friend> findByUserId(long userId);
}
