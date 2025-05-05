package com.forum.controller;

import com.forum.model.Post;
import com.forum.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<String> createPost(@RequestParam("userId") Long userId,
                                             @RequestParam("title") String title,
                                             @RequestParam("content") String content) {
        postService.createPost(userId, title, content);
        return ResponseEntity.ok("Post created successfully!");
    }

    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchPostsByTitle(@RequestParam("title") String title) {
        if (title == null || title.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Post> posts = postService.searchPostsByTitle(title);
        if (posts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(posts);
    }
}
