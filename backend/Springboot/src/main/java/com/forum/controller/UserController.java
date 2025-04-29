package com.forum.controller;

import com.forum.common.Result;
import com.forum.entity.User;
import com.forum.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping("/selectAll")
    public Result selectAll(){
        List<User> list=userService.selectAll();
        return Result.success(list);
    }
}
