package com.metabook.controller.web.api;

import com.metabook.dto.ResponseObject;
import com.metabook.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

    @GetMapping("/registration")
    public ResponseEntity<ResponseObject> validateLoginPage(@RequestBody User user) {
        return null;
    }

}
