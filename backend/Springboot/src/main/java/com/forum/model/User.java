package com.forum.model;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String email;
    private String password;
    private String username;
    private String avatar;
}
