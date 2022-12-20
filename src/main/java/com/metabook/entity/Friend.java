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
@Table(name = "friendship",
        uniqueConstraints = {@UniqueConstraint(name = "UN_friendship", columnNames = {"user_id", "other_user_id"})})
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean accept;
    private Date createAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;
    @ManyToOne
    @JoinColumn(name = "other_user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User otherUser;


    @Transient
    public String getCurrentDate() {
        return getString(createAt);
    }
}
