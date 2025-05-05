package com.forum.mapper;

import com.forum.model.Post;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PostMapper {

    @Insert("INSERT INTO posts (user_id, title, content, created_at) VALUES (#{userId}, #{title}, #{content}, #{createdAt})")
    void insertPost(Post post);

    @Select("SELECT * FROM posts WHERE title LIKE CONCAT('%', #{title}, '%')")
    List<Post> searchPostsByTitle(String title);
}
