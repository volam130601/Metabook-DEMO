package com.metabook.service.friend;

import com.metabook.entity.Friend;
import com.metabook.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;

import java.util.List;

public class FriendServiceImpl implements FriendService {
    @Autowired
    private FriendRepository friendRepository;

    @Override
    public List<Friend> findAll() {
        return friendRepository.findAll();
    }

    @Override
    public <S extends Friend> S save(S entity) {
        return friendRepository.save(entity);
    }

    @Override
    public <S extends Friend> long count(Example<S> example) {
        return friendRepository.count(example);
    }

    @Override
    public List<Friend> findByUserId(long userId) {
        return friendRepository.findByUserId(userId);
    }
}
