package com.forum.service;

import com.forum.entity.User;
import com.forum.mapper.UserMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.mindrot.jbcrypt.BCrypt;
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

    public User selectById(Integer id) {
        return userMapper.selectById(id);
    }

    public List<User> selectList(User user) {
        System.out.println(user);
        return null;
    }

    public PageInfo<User> selectPage(Integer pageNum, Integer pageSize) {
        PageHelper.startPage(pageNum, pageSize);
        List<User> list = userMapper.selectAll();
        return PageInfo.of(list);
    }

//    public void add(User user) {
//        userMapper.insert(user);
//    }

    public void createUser(String username, String email, String plainPassword) {
        String salt = generateSalt(); // 生成随机盐
        String hashedPassword = hashPassword(plainPassword, salt); // 应用层加密

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setSalt(salt);
        user.setPassword(hashedPassword);

        userMapper.insert(user);
    }

    // 使用更安全的BCrypt
    // 生成随机盐
    private String generateSalt() {
        return BCrypt.gensalt(); // 自动包含盐的BCrypt
    }

    // 应用层加密
    private String hashPassword(String password, String salt) {
        return BCrypt.hashpw(password, salt);
    }

}
