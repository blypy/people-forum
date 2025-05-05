package com.forum.service;

import com.forum.mapper.ReplyMapper;
import com.forum.model.Reply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReplyService {

    @Autowired
    private ReplyMapper replyMapper;

    public void createReply(Long postId, Long userId, String content) {
        Reply reply = new Reply();
        reply.setPostId(postId);
        reply.setUserId(userId);
        reply.setContent(content);
        reply.setCreatedAt(LocalDateTime.now());
        replyMapper.insertReply(reply);
    }
}
