package com.metabook.controller.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.dto.user.UserDto;
import com.metabook.entity.Friend;
import com.metabook.entity.User;
import com.metabook.service.friend.FriendService;
import com.metabook.service.user.CustomUserDetails;
import com.metabook.service.user.UserService;
import com.metabook.util.FileUploadUtil;
import com.metabook.util.converter.UserConvert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    FriendService friendService;
    @Autowired
    private UserService userService;

    public static User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUser = (CustomUserDetails) authentication.getPrincipal();
        return customUser.getUser();
    }

    @PostMapping("/edit")
    public ResponseEntity<ResponseObject> editAccountInformation(@RequestParam(value = "avatar-img", required = false) MultipartFile fileAvatarImg,
                                                                 @RequestParam(value = "cover-img", required = false) MultipartFile fileCoverImg,
                                                                 @RequestParam("data") String dataJson) throws IOException {
        User user = getUser();
        if (fileAvatarImg != null) {
            String avatar = fileAvatarImg.getOriginalFilename();
            user.setAvatar(avatar);
            String uploadDirAvatar = "user/" + user.getId() + "/avatar";
            FileUploadUtil.saveFile(uploadDirAvatar, avatar, fileAvatarImg);
        }
        if (fileCoverImg != null) {
            String coverImg = fileCoverImg.getOriginalFilename();
            user.setCoverImg(coverImg);
            String uploadDirCoverImg = "user/" + user.getId() + "/coverImg";
            FileUploadUtil.saveFile(uploadDirCoverImg, coverImg, fileCoverImg);
        }

        ObjectMapper mapper = new ObjectMapper();
        UserDto userDto = mapper.readValue(dataJson, UserDto.class);
        user = UserConvert.userDtoToUser(user, userDto);
        userService.save(user);
        return ResponseEntity.ok(
                new ResponseObject(user, "Post create is success", StatusCode.SUCCESS)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchUser(@RequestParam("kw") String keyword) {
        List<User> users = userService.searchByFullName(keyword);
        for (User user : users) {
            Friend exist = friendService.findByUserIdAndOtherUserId(getUser().getId(), user.getId());
            if (exist != null) {
                user.setFriendOfCurrentUser(exist.isAccept());
            }
        }
        return ResponseEntity.ok(new ResponseObject(users, "Search user success", StatusCode.SUCCESS));
    }

    @GetMapping("/getById/{userId}")
    public ResponseEntity<ResponseObject> getByUserId(@PathVariable("userId") long userId) {
        return ResponseEntity.ok(new ResponseObject(userService.findById(userId), "Find by user id success", StatusCode.SUCCESS));
    }

    @GetMapping("/current-user")
    public ResponseEntity<ResponseObject> getCurrentUser() {
        return ResponseEntity.ok(
                new ResponseObject(getUser(), "Get current user id success", StatusCode.SUCCESS)
        );
    }

    @GetMapping("/change-password")
    public ResponseEntity<ResponseObject> changePassword(@RequestParam("newPassword") String newPassword) {
        if (newPassword != null) {
            User user = userService.findByEmail(getUser().getEmail());
            user.setPassword(newPassword);
            userService.changePassword(user);
            return ResponseEntity.ok(
                    new ResponseObject(null, "Change password id success", StatusCode.SUCCESS)
            );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "Change password is incorrect.", StatusCode.FAILED)
        );
    }

    @GetMapping("/check-password")
    public ResponseEntity<ResponseObject> checkPassword(@RequestParam("password") String password) {
        if (userService.existsByPassword(getUser(), password))
            return ResponseEntity.ok(
                    new ResponseObject(null, "Old password is correct", StatusCode.SUCCESS)
            );
        return ResponseEntity.ok(
                new ResponseObject(null, "Old password is incorrect.", StatusCode.FAILED)
        );
    }
}
