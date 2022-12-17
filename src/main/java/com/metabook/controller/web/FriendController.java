package com.metabook.controller.web;

import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.entity.Friend;
import com.metabook.entity.User;
import com.metabook.service.friend.FriendService;
import com.metabook.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static com.metabook.controller.web.LoginController.getUser;

@RestController
@RequestMapping("/api/friend")
public class FriendController {
    @Autowired
    FriendService friendService;
    @Autowired
    UserService userService;

    @GetMapping("/findAll")
    public ResponseEntity<ResponseObject> findAllFriendByUser() {
        List<User> users = new ArrayList<>();
        for (Friend friend : friendService.findByUserId(getUser().getId())) {
            if (friend.isAccept()) users.add(friend.getOtherUser());
        }
        return ResponseEntity.ok(
                new ResponseObject(users, "Find All friend by user id Success", StatusCode.SUCCESS)
        );
    }

    @GetMapping("/find-accept-list")
    public ResponseEntity<ResponseObject> findAcceptList() {
        List<User> users = friendService.getFriendAcceptFalse(getUser().getId());
        if (users.size() > 0)
            return ResponseEntity.ok(
                    new ResponseObject(users, "Find All friend by user accept null id Success", StatusCode.SUCCESS)
            );
        return ResponseEntity.ok(
                new ResponseObject(null, "No friend requests have been sent to ", StatusCode.FAILED)
        );
    }

    @GetMapping("/find-first-accept")
    public ResponseEntity<ResponseObject> findFirstAccept() {
        List<User> users = friendService.getFriendAcceptFalse(getUser().getId());
        if (users.size() > 0) {
            return ResponseEntity.ok(
                    new ResponseObject(users.get(0), "Get news accept friend by user id Success", StatusCode.SUCCESS)
            );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "No friend requests have been sent to ", StatusCode.FAILED)
        );
    }

    @GetMapping("/add-friend/{friendId}")
    public ResponseEntity<ResponseObject> addFriend(@PathVariable("friendId") long friendId) {
        if (!friendService.existsByUserIdAndOtherUserId(friendId, getUser().getId())) {
            Friend friend = Friend.builder()
                    .user(getUser())
                    .otherUser(userService.findById(friendId))
                    .accept(false)
                    .build();
            friendService.save(friend);
            return ResponseEntity.ok(new ResponseObject(null, "Add friend is success", StatusCode.SUCCESS));
        } else {
            return ResponseEntity.ok(new ResponseObject(null, "A friend exists! You must waiting for him to accept a friend request.", StatusCode.FAILED));
        }
    }

    @GetMapping("/accept-friend/{friendId}")
    public ResponseEntity<ResponseObject> acceptFriend(@PathVariable("friendId") long friendId) {
        if (friendService.existsByUserIdAndOtherUserId(friendId, getUser().getId())) {
            Friend friend1 = friendService.findByUserIdAndOtherUserId(friendId, getUser().getId());
            friend1.setAccept(true);
            Friend friend2 = Friend.builder()
                    .user(getUser())
                    .otherUser(userService.findById(friendId))
                    .accept(true)
                    .build();
            friendService.save(friend1);
            friendService.save(friend2);
            return ResponseEntity.ok(new ResponseObject(null, "Add friend is success", StatusCode.SUCCESS));
        }
        return ResponseEntity.ok(new ResponseObject(null, "Cannot found invalid", StatusCode.FAILED));
    }

    @GetMapping("/remove-accept/{friendId}")
    public ResponseEntity<ResponseObject> removeAccept(@PathVariable("friendId") long friendId) {
        if (friendService.existsByUserIdAndOtherUserId(friendId, getUser().getId())) {
            friendService.deleteByUserIdAndOtherUserId(friendId, getUser().getId());
            return ResponseEntity.ok(new ResponseObject(null, "Remove accept is success", StatusCode.SUCCESS));
        }
        return ResponseEntity.ok(new ResponseObject(null, "Cannot found valid", StatusCode.FAILED));
    }

    @GetMapping("/unfriend/{friendId}")
    public ResponseEntity<ResponseObject> unFriend(@PathVariable("friendId") long friendId) {
        if (friendService.existsByUserIdAndOtherUserId(getUser().getId(), friendId)) {
            friendService.deleteByUserIdAndOtherUserId(getUser().getId(), friendId);
            friendService.deleteByUserIdAndOtherUserId(friendId, getUser().getId());
            return ResponseEntity.ok(new ResponseObject(null, "Unfriend is success", StatusCode.SUCCESS));

        }
        return ResponseEntity.ok(new ResponseObject(null, "Cannot found userId or friendId", StatusCode.FAILED));
    }

}
