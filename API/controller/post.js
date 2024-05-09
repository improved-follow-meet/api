import e from "express";
import pool from "../../database.js";
import esClient from "../../elasticSearch.js";

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
  // {
  //   "hits": {
  //       "hits": [
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "B17EF6D19C7A5B1EE83B907C595526DCB1EB06DB8227D650D5DDA0A9F4CE8CD9",
  //               "_score": 1.1001158,
  //               "_source": {
  //                   "id": 16,
  //                   "ownerId": 6,
  //                   "contentText": "Post 1 của Quang",
  //                   "createdAt": "2024-05-04T16:07:30Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "6B86B273FF34FCE19D6B804EFF5A3F5747ADA4EAA22F1D49C01E52DDB7875B4B",
  //               "_score": 1.0386479,
  //               "_source": {
  //                   "id": 1,
  //                   "ownerId": 1,
  //                   "contentText": "Post 1 của Bình",
  //                   "createdAt": "2024-05-04T16:07:30Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "4E07408562BEDB8B60CE05C1DECFE3AD16B72230967DE01F640B7E4729B49FCE",
  //               "_score": 1,
  //               "_source": {
  //                   "id": 3,
  //                   "ownerId": 1,
  //                   "contentText": "Post 3 của Bình",
  //                   "createdAt": "2024-05-04T16:07:30Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "535FA30D7E25DD8A49F1536779734EC8286108D115DA5045D77F3B4185D8F790",
  //               "_score": 1,
  //               "_source": {
  //                   "id": 23,
  //                   "ownerId": 1,
  //                   "contentImg": "",
  //                   "contentText": "b",
  //                   "createdAt": "2024-05-09T04:45:48Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "6F4B6612125FB3A0DAECD2799DFD6C9C299424FD920F9B308110A2C1FBD8F443",
  //               "_score": 1,
  //               "_source": {
  //                   "id": 21,
  //                   "ownerId": 1,
  //                   "contentText": "jfffffffffffff",
  //                   "createdAt": "2024-05-04T16:07:30Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "785F3EC7EB32F30B90CD0FCF3657D388B5FF4297F2F9716FF66E9B69C05DDD09",
  //               "_score": 1,
  //               "_source": {
  //                   "id": 22,
  //                   "ownerId": 1,
  //                   "contentImg": "",
  //                   "contentText": "a",
  //                   "createdAt": "2024-05-09T04:45:44Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "C2356069E9D1E79CA924378153CFBBFB4D4416B1F99D41A2940BFDB66C5319DB",
  //               "_score": 1,
  //               "_source": {
  //                   "id": 24,
  //                   "ownerId": 1,
  //                   "contentImg": "",
  //                   "contentText": "c",
  //                   "createdAt": "2024-05-09T04:45:52Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "B7A56873CD771F2C446D369B649430B65A756BA278FF97EC81BB6F55B2E73569",
  //               "_score": 1,
  //               "_source": {
  //                   "id": 25,
  //                   "ownerId": 1,
  //                   "contentImg": "",
  //                   "contentText": "e",
  //                   "createdAt": "2024-05-09T04:45:55Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "D4735E3A265E16EEE03F59718B9B5D03019C07D8B6C51F90DA3A666EEC13AB35",
  //               "_score": 1,
  //               "_source": {
  //                   "id": 2,
  //                   "ownerId": 1,
  //                   "contentText": "Post 2 của Bình",
  //                   "createdAt": "2024-05-04T16:07:30Z"
  //               }
  //           },
  //           {
  //               "_index": "posts",
  //               "_type": "doc",
  //               "_id": "9400F1B21CB527D7FA3D3EABBA93557A18EBE7A2CA4E471CFE5E4C5B4CA7F767",
  //               "_score": 1,
  //               "_source": {
  //                   "id": 19,
  //                   "ownerId": 1,
  //                   "contentText": "Post",
  //                   "createdAt": "2024-05-04T16:07:30Z"
  //               }
  //           }
  //       ]
  //   }
  // }

  // Change these data to
  // [
  //   {
  //     "id": 16,
  //     "ownerId": 6,
  //     "contentText": "Post 1 của Quang",
  //     "createdAt": "2024-05-04T16:07:30Z"
  //   },
  //   {
  //     "id": 16,
  //     "ownerId": 6,
  //     "contentText": "Post 1 của Quang",
  //     "createdAt": "2024-05-04T16:07:30Z"
  //   },
  //   {
  //     "id": 16,
  //     "ownerId": 6,
  //     "contentText": "Post 1 của Quang",
  //     "createdAt": "2024-05-04T16:07:30Z"
  //   }
  // ]

  try {
    const { body } = await esClient.search({
      index: "posts",
      filter_path: ["hits.hits._source", "aggregations.*"],
      sort: ["id:asc"],
      body: {
        query: {
          multi_match: {
            query: userId,
            fields: ["ownerId"],
          },
        },
      },
    });

    console.log(body.hits.hits);
    res.send(body.hits.hits.map((hit) => hit._source));
  } catch (err) {
    res.status(500).send(err.message);
  }
}

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

  // CALL STORED PROCEDURE deletePost(postId, userId)
  try {
    const command = 'CALL deletePost(?, ?)';
    const data = [postId, userId];
    await pool.query(command, data);
    res.send("Post deleted successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};


