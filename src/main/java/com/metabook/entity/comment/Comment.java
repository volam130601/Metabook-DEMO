package com.metabook.entity.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.metabook.entity.User;
import com.metabook.entity.post.Post;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import static com.metabook.entity.post.Post.getString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Date createAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    private User user;
    @ManyToOne
    @JoinColumn(name = "post_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIgnore
    private Post post;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private List<CommentLike> commentLikes;

    @Transient
    private long totalComment;

    @Transient
    private long totalCommentLike;

    @Transient
    public String getCommentTime() {
        return getString(createAt);
    }
}
