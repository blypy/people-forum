package com.forum.controller;

import com.forum.common.Result;
import com.forum.entity.User;
import com.forum.service.UserService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @PostMapping("/sigUp")
//    RequestBody,将前端传来的json或数组映射为Java对象
    public Result add(@RequestBody User user) {
        userService.createUser(user.getUsername(), user.getPassword(), user.getEmail());
        return Result.success();
    }


    @GetMapping("/selectAll")
    public Result selectAll(){
        List<User> list=userService.selectAll();
        return Result.success(list);
    }

    @GetMapping("/selectById/{id}")
    public Result selectById(@PathVariable Integer id){
        User user=userService.selectById(id);
        return Result.success(user);
    }

//    可以传递多个参数，可以定义不必传
    @GetMapping("/selectOne")
    public Result selectOne(@RequestParam Integer id ,@RequestParam(required = true) String email){
        User user=userService.selectById(id);
        return Result.success(user);
    }

//    get请求的对象可以接受多个参数，取决于对象定义的属性，并且这些参数都不是必传的
    @GetMapping("/selectList")
    public Result selectList(User user){
        List<User> list=userService.selectList(user);
        return Result.success(user);
    }

    @GetMapping("/selectPage")
    public Result selectPage(@RequestParam(defaultValue = "1") Integer page
            ,@RequestParam(defaultValue = "10") Integer size){
        PageInfo<User>pageInfo=userService.selectPage(page,size);
        return Result.success(pageInfo);
    }
}
