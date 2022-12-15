package com.metabook.controller.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.dto.user.UserDto;
import com.metabook.entity.User;
import com.metabook.service.user.UserService;
import com.metabook.util.FileUploadUtil;
import com.metabook.util.converter.UserConvert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.metabook.controller.web.LoginController.getUser;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

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
}
