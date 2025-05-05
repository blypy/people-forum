package com.forum.controller;

import com.forum.model.Reply;
import com.forum.service.ReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/replies")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    @PostMapping("/comment")
    public void createReply(@RequestParam("postId") Long postId,
                           @RequestParam("userId") Long userId,
                           @RequestParam("content") String content)
    {
        replyService.createReply(postId, userId, content);
        replyService.createReply(postId, userId, content);
    }
}
