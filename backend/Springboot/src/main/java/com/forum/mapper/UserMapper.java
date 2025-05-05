package com.forum.mapper;

import com.forum.model.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Insert("INSERT INTO users (email, password, username, avatar) VALUES (#{email}, #{password}, #{username}, #{avatar})")
    void insertUser(User user);

    @Select("SELECT * FROM users WHERE email = #{email}")
    User getUserByEmail(String email);
}
