import pool from "../../database.js";
import esClient from "../../elasticSearch.js";

export const getComments = async (req, res) => {
  const postId = req.query.postId;

  // GET comments / _search
  // {
  //   "query": {
  //     "match": {
  //       "postId": 3
  //     }
  //   }
  // }

  try {
    const { body } = await esClient.search({
      index: "comments",
      filter_path: ["hits.hits._source", "aggregations.*"],
      sort: ["createdAt:desc"],
      size: 10000,
      body: {
        query: {
          match: { postId: postId },
        },
      },
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
  const userId = req.user.id;
  const { commentId } = req.body;
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
