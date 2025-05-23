package com.pafassigment.PowerWorld.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pafassigment.PowerWorld.dao.CommentDao;
import com.pafassigment.PowerWorld.dao.LikeDao;
import com.pafassigment.PowerWorld.dao.PostDao;
import com.pafassigment.PowerWorld.dao.UserDao;
import com.pafassigment.PowerWorld.entity.Comment;
import com.pafassigment.PowerWorld.entity.Like;
import com.pafassigment.PowerWorld.entity.Post;
import com.pafassigment.PowerWorld.entity.User;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    private final PostDao postDao;
    private final CommentDao commentDao;
    private final LikeDao likeDao;
    private final UserDao userDao;

    public PostServiceImpl(PostDao postDao, CommentDao commentDao,
                           LikeDao likeDao, UserDao userDao) {
        this.postDao = postDao;
        this.commentDao = commentDao;
        this.likeDao = likeDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Post> getAllPosts() {
        List<Post> posts = postDao.findAll();
        posts.forEach(this::mapValuesToPost);
        return posts;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Post> getPostById(String postId) {
        Optional<Post> post = postDao.findById(postId);
        post.ifPresent(this::mapValuesToPost);
        return post;
    }

    @Override
    public Post createPost(Post post) {
        if (post == null) {
            throw new IllegalArgumentException("Post cannot be null");
        }
        return postDao.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        if (post == null) {
            throw new IllegalArgumentException("Post cannot be null");
        }
        return postDao.save(post);
    }

    @Override
    public void deletePostById(String postId) {
        postDao.deleteById(postId);
    }

    private void mapValuesToPost(Post post) {
        List<Comment> comments = commentDao.findByPostId(post.getId());
        post.setComments(comments);
        comments.forEach(comment -> {
            Optional<User> user = userDao.findById(comment.getUserId());
            user.ifPresent(comment::setCommentedUser);
        });

        List<Like> likes = likeDao.findByPostId(post.getId());
        post.setLikes(likes);

        Optional<User> user = userDao.findById(post.getUserId());
        user.ifPresent(post::setPostedUser);
    }
}
