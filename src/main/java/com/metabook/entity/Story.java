package com.metabook.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

import static com.metabook.entity.post.Post.getString;

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
        return getString(createAt);
    }
}
