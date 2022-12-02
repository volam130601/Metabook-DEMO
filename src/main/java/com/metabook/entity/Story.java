package com.metabook.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String image;
    private Date createAt;

    @ManyToOne
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @Transient
    public String getImagePath() {
        if (image == null || id == null) return null;

        return "/image/story/" + id + "/" + image;
    }

    @Transient
    public String getCurrentDate() {
        if (createAt == null) return null;
        Date dateTemp = new Date();
        long subTime = dateTemp.getTime() - createAt.getTime();
        long seconds = subTime / 1000;
        long minutes = subTime / (60 * 1000);
        long hours = subTime / (60 * 60 * 1000);
        long days = subTime / (24 * 60 * 60 * 1000);

        if (days != 0) {
            return days + " days";
        } else if (hours != 0) {
            return hours + " hours";
        } else if (minutes != 0) {
            return minutes + " minutes";
        } else return seconds + " seconds";
    }
}
