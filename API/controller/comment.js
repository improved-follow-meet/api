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
  const { userId, postId, contentText } = req.body;
  try {
    let result = await pool.query(
      "SELECT MAX(id + 1) as missing_id FROM comments;"
    );
    const newCommentId = result[0][0].missing_id;
    const data = [newCommentId, userId, postId, contentText, new Date()];
    let command =
      "INSERT INTO comments (id, ownerId, postId, contentText, createdAt, deletedAt) VALUES (?, ?, ?, ?, ?, NULL);";
    await pool.query(command, data);
    res.send("Add comment successfully");
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
    const command1 = `update comments set deletedAt = CURRENT_TIMESTAMP where id = (?);`;
    const data = [commentId];
    await pool.query(command1, data);
    const command2 = `update user_react_comment set deletedAt = CURRENT_TIMESTAMP where commentId = (?);`;
    await pool.query(command2, data);
    res.send("Delete comment successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
