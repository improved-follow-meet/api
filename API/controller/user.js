import pool from "../database.js";
import checkValidEmail from "../Utils/checkValidEmail.js";
import checkValidFullName from "../Utils/checkValidFullName.js";
import checkValidUsername from "../Utils/checkValidUsername.js";

/**
 * function to get user info
 * @param userId
 * @returns object of user
 */
export const getUserInfos = async (req, res) => {
  const { userId } = req.query;
  try {
    const command = "SELECT * FROM users WHERE id = ? and deletedAt is null";
    const [users, fields] = await pool.query(command, [userId]);
    if (users.length === 0) {
      throw new Error(`User ${userId} is not exist`);
    }
    users.forEach((element) => {
      delete element.passwordHash;
    });
    res.send(users[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

/**
 * function to get user id
 * @params username
 * @returns userId
 */
export const getUserIdByUsername = async (req, res) => {
  const { username } = req.query;
  try {
    const command =
      "SELECT * FROM users WHERE username = ? and deletedAt is null";
    const [users, fields] = await pool.query(command, [username]);
    if (users.length === 0) {
      throw new Error("Username is not exist");
    }
    res.send(users[0].id.toString());
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getUsernameById = async (req, res) => {
  const { userId } = req.query;
  try {
    const command = "SELECT * FROM users WHERE id = ? and deletedAt is null";
    const [users, fields] = await pool.query(command, [userId]);
    if (users.length === 0) {
      throw new Error("User id is not exist");
    }
    res.send(users[0].username);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const suggestUser = async (req, res) => {
  const { userId } = req.query;
  try {
    let command =
      "select * from users where users.id not in (select ufu.userTargetId from user_follow_user as ufu) and users.id != (?) and deletedAt is null order by rand() limit 3;";
    const [users, fields] = await pool.query(command, [userId]);
    users.forEach((element) => {
      delete element.passWordHash;
    });
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateInfo = async (req, res) => {
  const userId = req.body.userId;
  const username = req.body.username;
  const fullName = req.body.fullName;
  const bio = req.body.bio;
  const email = req.body.email;
  try {
    if (username) await checkValidUsername(username);
    if (email) await checkValidEmail(email);
    if (fullName) await checkValidFullName(fullName);
    let command = "UPDATE users SET ";
    let data = [];
    if (username) {
      let subCommand =
        "SELECT * FROM users WHERE username = ? and deletedAt is null";
      const [res, fields] = await pool.query(subCommand, [username]);
      if (res.length !== 0) {
        throw new Error("Username is already exist");
      }
      command += "username = ?, ";
      data.push(username);
    }
    if (fullName) {
      command += "fullName = ?, ";
      data.push(fullName);
    }
    if (bio) {
      command += "bio = ?, ";
      data.push(bio);
    }
    if (email) {
      command += "email = ?, ";
      data.push(email);
    }
    command = command.slice(0, -2);
    command += " WHERE id = ?";
    data.push(userId);
    if (data.length === 1) {
      throw new Error("No data to update");
    }
    await pool.query(command, data);
    res.send("Update successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updatePFP = async (req, res) => {
  const userId = req.body.userId;
  const PFP = req.body.PFP;
  try {
    let command = "UPDATE users SET profilePicture = ? WHERE id = ?";
    const data = [PFP, userId];
    await pool.query(command, data);
    res.send("Updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateCover = async (req, res) => {
  const userId = req.body.userId;
  const coverPicture = req.body.coverPicture;
  try {
    let command = "UPDATE users SET coverPicture = ? WHERE id = ?";
    const data = [coverPicture, userId];
    await pool.query(command, data);
    res.send("Updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
