package com.forum.exception;

import com.forum.common.Result;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

//标注为全局异常处理类，捕获controller中的异常
@ControllerAdvice("com.python_forum.controller")
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody//返回json串
    public Result error(Exception e) {
        e.printStackTrace();
        return Result.error();
    }

    //捕获自定义异常
    @ExceptionHandler(CustomerException.class)
    @ResponseBody//返回json串
    public Result error(CustomerException e) {
//        e.printStackTrace();
        return Result.error(e.getCode(), e.getMsg());
    }

}
