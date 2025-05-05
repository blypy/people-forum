package com.forum.service;

import com.forum.mapper.PostMapper;
import com.forum.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostMapper postMapper;

    public void createPost(Long userId, String title, String content) {
        Post post = new Post();
        post.setUserId(userId);
        post.setTitle(title);
        post.setContent(content);
        post.setCreatedAt(LocalDateTime.now());
        postMapper.insertPost(post);
    }

    public List<Post> searchPostsByTitle(String title) {
        return postMapper.searchPostsByTitle(title);
    }
}