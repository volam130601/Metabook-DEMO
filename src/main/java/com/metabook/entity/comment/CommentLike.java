package com.metabook.entity.comment;

import com.metabook.entity.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "comment_like",
        uniqueConstraints = {@UniqueConstraint(name = "UN_user_comment", columnNames = {"user_id", "comment_id"})})
public class CommentLike implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Comment comment;

}
