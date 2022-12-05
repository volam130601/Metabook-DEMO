package com.metabook.entity.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.metabook.entity.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String content;
    private Date createAt;
    @OneToMany(mappedBy = "post")
    @EqualsAndHashCode.Exclude
    private List<PostImage> postImages;
    @ManyToOne
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;


    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<PostLike> postLikeList;
    @Transient
    private long countLikes;
    @Transient
    private long countComments;
    @Transient
    private long countShares;

    public static String getString(Date createAt) {
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

    @Transient
    public String getPostCurrentDate() {
        return getString(createAt);
    }

}
