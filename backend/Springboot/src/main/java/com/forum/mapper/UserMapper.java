package com.forum.mapper;

import com.forum.entity.User;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserMapper {

    List<User> selectAll();

//    简单的sql可以通过注解来写
    @Select("select * from user where id=#{id};")
    User selectById(Integer id);

    void insert(User user);
}
