import pool from "../../database.js";

export const getReacts = async (req, res) => {
  const { postId } = req.query;
  try {
    let command =
      "SELECT * FROM user_react_post WHERE postId = (?) and deletedAt is null;";
    const [reacts, fields] = await pool.query(command, [postId]);
    res.send(reacts.length.toString());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const isReacted = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.query;
  try {
    let command =
      "SELECT * FROM user_react_post WHERE postId = (?) AND userId = (?) and deletedAt is null;";
    const [users, fields] = await pool.query(command, [postId, userId]);
    if (users.length > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const reactPost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.body;
  try {
    let command =
      "SELECT * FROM user_react_post WHERE postId = (?) AND userId = (?) and deletedAt is null;";
    const [users, fields] = await pool.query(command, [postId, userId]);
    if (users.length > 0) {
      throw new Error("User is already reacted");
    }
    command = "INSERT INTO user_react_post VALUES (?, ?, ?, NULL);";
    await pool.query(command, [postId, userId, new Date()]);
    res.send("React successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const unreactPost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.body;
  try {
    let command =
      "SELECT * FROM user_react_post WHERE postId = (?) AND userId = (?) and deletedAt is null ;";
    const [users, fields] = await pool.query(command, [postId, userId]);
    if (users.length === 0) {
      throw new Error("User is not reacted");
    }
    command =
      "DELETE FROM user_react_post WHERE postId = (?) AND userId = (?);";
    await pool.query(command, [postId, userId]);
    res.send("Unreact successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
