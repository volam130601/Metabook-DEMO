package com.metabook.service.friend;

import com.metabook.entity.Friend;
import com.metabook.entity.User;
import com.metabook.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendServiceImpl implements FriendService {
    @Autowired
    private FriendRepository friendRepository;

    @Override
    public List<Friend> findAll() {
        return friendRepository.findAll();
    }

    @Override
    public <S extends Friend> S save(S entity) {
        entity.setCreateAt(new Date());
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

    @Override
    public List<User> getFriendAcceptFalse(long otherUserId) {
        List<Friend> friends = friendRepository.findByOtherUserId(otherUserId)
                .stream().sorted(Comparator.comparing(Friend::getId).reversed())
                .collect(Collectors.toList());
        List<User> users = new ArrayList<>();
        for (Friend friend : friends) {
            if (!friend.isAccept()) {
                friend.getUser().setAcceptFriendDate(friend.getCurrentDate());
                users.add(friend.getUser());
            }
        }
        return users;
    }

    @Override
    public boolean existsByUserIdAndOtherUserId(long userId, long otherUserId) {
        return friendRepository.existsByUserIdAndOtherUserId(userId, otherUserId);
    }

    @Override
    public Friend findByUserIdAndOtherUserId(long userId, long otherUserId) {
        return friendRepository.findByUserIdAndOtherUserId(userId, otherUserId);
    }

    @Override
    public void deleteByUserIdAndOtherUserId(long userId, long otherUserId) {
        friendRepository.deleteByUserIdAndOtherUserId(userId, otherUserId);
    }


}
