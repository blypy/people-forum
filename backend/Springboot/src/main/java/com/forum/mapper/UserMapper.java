package com.forum.mapper;

import com.forum.entity.User;

import java.util.List;

public interface UserMapper {
    List<User> selectAll();
}
