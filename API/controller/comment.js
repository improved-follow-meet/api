import pool from "../../database.js";

export const getComments = async (req, res) => {
  const { postId } = req.query;
  try {
    let command =
      "SELECT * FROM comments WHERE postId = (?) and deletedAt is null;";
    const [comments, fields] = await pool.query(command, [postId]);
    await comments.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    res.send(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getNumComments = async (req, res) => {
  const { postId } = req.query;
  try {
    let command =
      "SELECT * FROM comments WHERE postId = (?) and deletedAt is null;";
    const [comments, fields] = await pool.query(command, [postId]);
    res.send(comments.length.toString());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addComment = async (req, res) => {
  const userId = req.user.id;
  const { postId, contentText } = req.body;

  console.log(req.body);

  // CALL STORED PROCEDURE createPost(userId, contentImg, contentText)
  try {
    const command = "CALL createComment(?, ?, ?)";
    const data = [userId, postId, contentText];
    await pool.query(command, data);
    res.send("Comment added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteComment = async (req, res) => {
  const { commentId, userId } = req.body;
  try {
    const command0 =
      "SELECT * FROM comments WHERE id = (?) and ownerId = (?) and deletedAt is null;";
    const [comments, fields] = await pool.query(command0, [commentId, userId]);
    if (comments.length === 0) {
      throw new Error("You are not the owner of this comment");
    }

    // DELETE FROM comments WHERE id = (?)
    const command = "DELETE FROM comments WHERE id = (?)";
    const data = [commentId];
    await pool.query(command, data);
    res.send("Delete comment successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
