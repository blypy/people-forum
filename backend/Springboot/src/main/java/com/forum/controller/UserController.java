package com.forum.controller;

import com.forum.model.User;
import com.forum.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam("email") String email,
                                           @RequestParam("password") String password,
                                           @RequestParam("username") String username) {
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setUsername(username);
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("email") String email,
                                        @RequestParam("password") String password) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }
        if (userService.validatePassword(password, user.getPassword())) {
            return ResponseEntity.ok("Login successful!");
        }
        return ResponseEntity.badRequest().body("Incorrect password.");
    }
}
