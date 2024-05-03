import pool from "../../database.js";

export const getLatestActivities = async (req, res) => {
  const { userId } = req.query;
  try {
    let command = `SELECT urp.*, 'user_react_post' as activity_type
    FROM user_react_post AS urp
    JOIN posts AS p ON urp.postId = p.id
    WHERE p.ownerId = (?) and urp.userId != (?)
    and urp.deletedAt is null
    
    UNION ALL
    
    SELECT ufu.*, 'user_follow_user' as activity_type
    FROM user_follow_user AS ufu
    WHERE ufu.userTargetId = (?)
    and ufu.deletedAt is null
    
    UNION ALL
    
    SELECT c.id as postId, c.ownerId as userId, c.createdAt, c.deletedAt, 'comment' as activity_type
    FROM comments AS c
    JOIN posts AS p ON c.postId = p.id
    WHERE p.ownerId = (?) and c.ownerId != (?)
    and c.deletedAt is null
    
    ORDER BY createdAt DESC, rand() limit 4;`;
    const [activities, fields] = await pool.query(command, [
      userId,
      userId,
      userId,
      userId,
      userId,
    ]);
    let key = 0;
    for (const element of activities) {
      element.key = key++;
      if (element.activity_type === "user_follow_user") {
        element.ownerId = element.postId;
      } else {
        element.ownerId = element.userId;
      }
      delete element.postId;
      delete element.userId;
      if (element.activity_type === "user_react_post") {
        element.message = "reacted to your post";
      } else if (element.activity_type === "user_follow_user") {
        element.message = "followed you";
      } else {
        element.message = "commented on your post";
      }
      delete element.activity_type;
    }
    res.send(activities);
    // console.log(activities);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
