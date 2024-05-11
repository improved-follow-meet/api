import esClient from "../../elasticSearch.js";

export const searchPost = async (req, res) => {
  const { query } = req.body;

  try {
    const { body } = await esClient.search({
      index: "posts",
      filter_path: ["hits.hits._source", "aggregations.*"],
      sort: ["id:asc"],
      size: 5,
      body: {
        query: {
          match: { contentText: { query: query, fuzziness: "AUTO", analyzer: "standard" } },
        },
      },
    });
    
    if (body.hits.total.value === 0) {
      res.status(404).send("No posts found");
    }

    console.log(body.hits.hits);
    res.send(body.hits.hits.map((hit) => hit._source));
  }
  catch (err) {
    res.status(500).send(err.message);
  }
};

