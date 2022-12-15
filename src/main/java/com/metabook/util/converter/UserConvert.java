package com.metabook.util.converter;

import com.metabook.dto.user.UserDto;
import com.metabook.entity.User;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class UserConvert {
    public static User userDtoToUser(User user, UserDto userDto) {
        try {
            if (userDto.getNewEmail() != null) {
                user.setEmail(userDto.getNewEmail());
                user.setFullName(userDto.getFirstName() + " " + userDto.getLastName());
                user.setPassword(userDto.getNewPassword());
            }
            if (userDto.getFirstName() == null) user.setFullName(userDto.getFullName());
            user.setGender(userDto.isGender());
            user.setCountry(userDto.getCountry());
            user.setPhoneNumber(userDto.getPhoneNumber());
            SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
            user.setBirthDay(f.parse(userDto.getBirthday()));
            return user;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

}
