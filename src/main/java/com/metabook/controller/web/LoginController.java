package com.metabook.controller.web;

import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.entity.User;
import com.metabook.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/registration", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseObject> registration(@RequestBody User user) {
        if (!userService.existEmail(user.getNewEmail())) {
            user.setEmail(user.getNewEmail());
            user.setPassword(user.getNewPassword());
            userService.register(user);
            return ResponseEntity.ok(new ResponseObject(user, "Registration is success", StatusCode.SUCCESS));
        } else {
            return ResponseEntity.ok(new ResponseObject(null, "Email is exist", StatusCode.FAILED));
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<ResponseObject> checkExistEmail(@RequestParam("newEmail") String newEmail) {
        if (userService.existEmail(newEmail))
            return ResponseEntity.ok(new ResponseObject(null, "Email is exist", StatusCode.SUCCESS));
        else
            return ResponseEntity.ok(new ResponseObject(null, "Email isn't exist", StatusCode.FAILED));
    }


}
