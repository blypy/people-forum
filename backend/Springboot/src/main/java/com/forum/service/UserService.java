package com.forum.service;

import com.forum.entity.User;
import com.forum.mapper.UserMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

//创建Service,并且标注为SpringBoot里的一个bean
@Service
public class UserService {

    @Resource
    private UserMapper userMapper;
    public List<User> selectAll() {
//        其他业务逻辑
        return userMapper.selectAll();
    }
}
