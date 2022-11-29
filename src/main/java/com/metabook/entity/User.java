package com.metabook.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "users",
        uniqueConstraints = {@UniqueConstraint(name = "UN_Email", columnNames = "email")})
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 50)
    private String email;
    @Column(nullable = false)
    private String password;
    private Integer phoneNumber;
    private String firstName;
    private String lastName;
    private String fullName;

    public String getFullName() {
        return firstName + " " + lastName;
    }

    private boolean gender = true;

    public String getGender() {
        return (gender) ? "Male" : "Female";
    }

    private Date birthDay;
    private String country;

    private boolean isEnabled = false;

    @CreatedDate
    private Date createAt;
    private Date updateAt;

    @ManyToOne
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Role role;

    @Transient
    private String newEmail;
    @Transient
    private String newPassword;
}
