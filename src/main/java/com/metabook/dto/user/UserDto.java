package com.metabook.dto.user;

import lombok.Data;

@Data
public class UserDto {
    private String firstName;
    private String lastName;
    private String newEmail;
    private String newPassword;
    private String fullName;
    private boolean gender;
    private String birthday;
    private String country;
    private String phoneNumber;
}
