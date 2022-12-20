package com.metabook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.metabook.entity.comment.Comment;
import com.metabook.entity.comment.CommentLike;
import com.metabook.entity.post.Post;
import com.metabook.entity.post.PostLike;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "users",
        uniqueConstraints = {@UniqueConstraint(name = "UN_Email", columnNames = "email")})
public class User implements Serializable {
    @Transient
    public boolean friendOfCurrentUser = false;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 50)
    private String email;
    @Column(nullable = false)
    @ToString.Exclude
    @JsonIgnore
    private String password;
    @Column(length = 10)
    private String phoneNumber;
    @Transient
    private String firstName;
    @Transient
    private String lastName;
    private String fullName;
    private boolean gender = true;
    private Date birthDay;
    private String country;
    private boolean isEnabled = false;
    private String avatar;
    private String coverImg;
    @CreatedDate
    private Date createAt;
    private Date updateAt;
    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Role role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<Story> storyList;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<Post> postList;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<PostLike> postLikeList;
    @OneToMany(mappedBy = "user")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<Comment> commentList;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<CommentLike> commentLikes;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<Friend> friendListUsers;
    @OneToMany(mappedBy = "otherUser", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<Friend> friendList;
    @Transient
    private String acceptFriendDate;

    @Transient
    public String getGender() {
        return (gender) ? "Male" : "Female";
    }

    @Transient
    public String getAvatarPath() {
        if (avatar == null || id == null) return "/web/image/avatar_batman.png";

        return "/image/user/" + id + "/avatar/" + avatar;
    }

    @Transient
    public String getCoverImgPath() {
        if (coverImg == null || id == null) return "/web/image/cover-img-1.jpg";

        return "/image/user/" + id + "/coverImg/" + coverImg;
    }

    @Transient
    public String getStrBirthDay() {
        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
        return f.format(birthDay);
    }
}
