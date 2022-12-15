package com.metabook.entity;

import lombok.*;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
    private User user;
    @ManyToOne
    @JoinColumn(name = "other_user_id")
    @EqualsAndHashCode.Exclude
//    @ToString.Exclude
    private User otherUser;
}
