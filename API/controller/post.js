import e from "express";
import pool from "../../database.js";

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

  // CALL STORED PROCEDURE createPost(userId, contentImg, contentText)
  try {
    const command = 'CALL createPost(?, ?, ?)';
    const data = [userId, contentImg, contentText];
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
      "SELECT * FROM posts WHERE id = (?) and ownerId = (?);";
    const [posts, fields] = await pool.query(command0, [postId, userId]);
    if (posts.length === 0) {
      throw new Error("You are not the owner of this post");
    }

    const command = 'DELETE FROM posts WHERE id = (?)';
    const data = [postId];
    await pool.query(command, data);

    res.send("Post deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
