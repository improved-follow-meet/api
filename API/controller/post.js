import e from "express";
import pool from "../../database.js";
import esClient from "../../elasticSearch.js";

export const getPostsUserFollowing = async (req, res) => {
  const userId = req.user.id;
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

const wordFilter = async (sentence) => {
  let words = sentence.split(" ");
  let newSentence = "";
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    try {
      const { body } = await esClient.search({
        index: "wordfilter",
        body: {
          query: {
            match: { word: word },
          },
        },
      });
      if (body.hits.hits.length > 0) {
        newSentence += "*".repeat(word.length) + " ";
      } else {
        newSentence += word + " ";
      }
    } catch (err) {
      console.log(err);
    }
  }
  return newSentence;
}

export const getPostsOfUser = async (req, res) => {
  const userId = req.query.userId;

  try {
    const { body } = await esClient.search({
      index: "posts",
      filter_path: ["hits.hits._source", "aggregations.*"],
      sort: ["createdAt:desc"],
      size: 10000,
      body: {
        query: {
          bool: {
            must_not: [
              {
                exists: {
                  field: "deletedAt"
                }
              }
            ],
            must: [
              { match: { ownerId: userId } },
            ],
          },
        },
      }
    });

    if (!body.hits) {
      res.status(404).send("No results found");
      return;
    }

    console.log(body.hits.hits);
    res.send(body.hits.hits.map((hit) => hit._source));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export const addPost = async (req, res) => {
  const userId = req.user.id;
  const { contentImg, contentText } = req.body;
  const newContentText = await wordFilter(contentText);

  try {
    const command = 'CALL createPost(?, ?, ?)';
    const data = [userId, contentImg, newContentText];
    await pool.query(command, data);
    res.send("Post added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export const deletePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.body;

  try {
    const checkDeleted = await pool.query('SELECT deletedAT FROM posts WHERE ownerId = (?) AND id = (?);', [userId, postId]);
    if (checkDeleted[0][0].deletedAT != null) {
      res.send('Delete failed. Post deleted.');
      return;
    }
    else {
      const command = 'CALL deleteFromPosts(?, ?);';
      const data = [postId, userId];
      await pool.query(command, data);
      res.send("Post deleted successfully");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getDeletedPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const { body } = await esClient.search({
      index: "posts",
      filter_path: ["hits.hits._source", "aggregations.*"],
      sort: ["createdAt:desc"],
      size: 10000,
      body: {
        query: {
          bool: {
            must: [
              {
                exists: {
                  field: "deletedAt"
                }
              }
            ],
            must: [
              { match: { ownerId: userId } },
            ],
          },
        },
      }
    });

    if (!body.hits) {
      res.status(404).send("No results found");
      return;
    }

    console.log(body.hits.hits);
    res.send(body.hits.hits.map((hit) => hit._source));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export const restoreDeletedPost = async (req, res) => {
  const { deletedPostId } = req.body;

  try {
    const command = "CALL restorePost(?);";
    const respone = await pool.query(command, [deletedPostId]);
    // console.log(respone); 
    const affectedRows = respone[0].affectedRows;

    if (affectedRows === 0) {
      res.send("No rows were restored.")
    } else if (affectedRows === 1) {
      res.send("Restore post successfully.");
    } else {
      res.send("Restore post failed.");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}