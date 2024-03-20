import e from "express";
import pool from "../database.js";

export const getPostsUserFollowing = async (req, res) => {
  const { userId } = req.query;
  try {
    let command =
      "SELECT * FROM posts INNER JOIN user_follow_user ON posts.ownerId = user_follow_user.userTargetId WHERE user_follow_user.deletedAt is null and posts.deletedAt is null and user_follow_user.userSourceId = (?) order by posts.createdAt desc;";
    const [posts, fields2] = await pool.query(command, [userId]);
    if (posts.length === 0) {
      let command =
        "SELECT * FROM posts WHERE ownerId != (?) and deletedAt is null order by createdAt desc;";
      const [posts, fields2] = await pool.query(command, [userId]);
      res.send(posts);
    } else {
      res.send(posts);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getPostsOfUser = async (req, res) => {
  const { userId } = req.query;
  try {
    let command =
      "SELECT * FROM posts WHERE ownerId = (?) and deletedAt is null ORDER BY createdAt DESC;";
    const [posts, fields] = await pool.query(command, [userId]);
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addPost = async (req, res) => {
  const { userId, contentImg, contentText } = req.body;
  console.log(req.body);
  try {
    const result = await pool.query(
      "SELECT MAX(id + 1) as missing_id FROM posts;"
    );
    const newPostId = result[0][0].missing_id;
    console.log(newPostId);
    const data = [newPostId, userId, contentImg, contentText, new Date()];
    const command =
      "INSERT INTO posts (id, ownerId, contentImg, contentText, createdAt, deletedAt) VALUES (?, ?, ?, ?, ?, NULL)";
    await pool.query(command, data);
    res.send("Post added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deletePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    // check if the user is the owner of the post
    const command0 =
      "SELECT * FROM posts WHERE id = (?) and ownerId = (?) and deletedAt is null;";
    const [posts, fields] = await pool.query(command0, [postId, userId]);
    if (posts.length === 0) {
      throw new Error("You are not the owner of this post");
    }
    const command = `update posts set deletedAt = CURRENT_TIMESTAMP where id = (?);`;
    const data = [postId];
    await pool.query(command, data);
    const command2 = `update comments set deletedAt = CURRENT_TIMESTAMP where postId =(?);`;
    await pool.query(command2, data);
    const command3 = `update user_react_post set deletedAt = CURRENT_TIMESTAMP where postId = (?);`;
    await pool.query(command3, data);
    const command4 = `update user_react_comment set deletedAt = CURRENT_TIMESTAMP where commentId in (select id from comments where postId = (?));`;
    await pool.query(command4, data);
    res.send("Post deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
