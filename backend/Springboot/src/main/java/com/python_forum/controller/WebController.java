package com.python_forum.controller;

import com.python_forum.common.Result;
import com.python_forum.exception.CustomerException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class WebController {

    @GetMapping("hello")//标注Get请求方法
    public Result sayHello() {
        return Result.success("Hello World!");
    }

    @GetMapping("count")
    public Result count() {
//        int a=1/0;
//        return Result.success(10);
        throw new CustomerException("400","禁止访问！");
//        throw new RuntimeException("禁止请求!");
    }

    @GetMapping("map")
    public Result map(){
        HashMap<String, Object> map=new HashMap<>();
        map.put("name","AH");
        map.put("age",19);
        return Result.success(map);
    }

}
