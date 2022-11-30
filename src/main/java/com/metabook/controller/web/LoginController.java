package com.metabook.controller.web;

import com.metabook.dto.EmailDetails;
import com.metabook.dto.ResponseObject;
import com.metabook.dto.StatusCode;
import com.metabook.entity.User;
import com.metabook.service.email.EmailService;
import com.metabook.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping(value = "/registration", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<ResponseObject> registration(@RequestBody User user) {
        if (!userService.existsUserByEmail(user.getNewEmail())) {
            user.setEmail(user.getNewEmail());
            user.setPassword(user.getNewPassword());
            userService.register(user);
            return ResponseEntity.ok(new ResponseObject(user, "Registration is success", StatusCode.SUCCESS));
        } else {
            return ResponseEntity.ok(new ResponseObject(null, "Email is exist", StatusCode.FAILED));
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<ResponseObject> checkExistEmail(@RequestParam("email") String email) {
        if (userService.existsUserByEmail(email))
            return ResponseEntity.ok(new ResponseObject(null, "Email is exist", StatusCode.SUCCESS));
        else
            return ResponseEntity.ok(new ResponseObject(null, "Email isn't exist", StatusCode.FAILED));
    }

    @GetMapping("/send-email")
    public ResponseEntity<ResponseObject> sendEmail(@RequestParam("email") String email) {
        if (userService.existsUserByEmail(email)) {
            User user = userService.findByEmail(email);
            //Cho nó chạy một luồng riêng với AJAX.
            Map<String, Object> properties = new HashMap<>();
            properties.put("email", email);
            properties.put("name", user.getLastName());
            String password = "123123";
            user.setPassword(password);
            userService.save(user);
            properties.put("password", "123123");
            EmailDetails emailDetails = EmailDetails.builder()
                    .to(email)
                    .subject("Molla Store - Reset your password")
                    .template("web/email-template.html")
                    .properties(properties)
                    .build();
            Map<String, String> messages = emailService.sendHtmlMessage(emailDetails);
            if (messages.get("status").equals(StatusCode.SUCCESS))
                return ResponseEntity.ok(
                        new ResponseObject(user, messages.get("message"), StatusCode.SUCCESS)
                );
            else
                return ResponseEntity.ok(
                        new ResponseObject(user, messages.get("message"), StatusCode.FAILED)
                );
        }
        return ResponseEntity.ok(
                new ResponseObject(null, "Cannot found this email address.", StatusCode.FAILED)
        );
    }

}
