package com.forum.mapper;

import com.forum.model.Reply;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReplyMapper {

    @Insert("INSERT INTO replies (post_id, user_id, content, created_at) VALUES (#{postId}, #{userId}, #{content}, #{createdAt})")
    void insertReply(Reply reply);
}
