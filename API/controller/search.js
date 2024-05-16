import esClient from "../../elasticSearch.js";

export const searchPost = async (req, res) => {
  // Get query from params "search?query=..."
  const query = req.query.query;

  try {
    const { body } = await esClient.search({
      index: "posts",
      filter_path: ["hits.hits._source", "aggregations.*"],
      sort: ["_score:desc"],
      size: 5,
      body: {
        query: {
          match: { contentText: { query: query, fuzziness: "AUTO", analyzer: "standard" } },
        },
      },
    });

    if (!body.hits) {
      res.status(404).send("No results found");
      return;
    }

    console.log(body.hits.hits);
    res.send(body.hits.hits.map((hit) => hit._source));
  }
  catch (err) {
    res.status(500).send(err.message);
  }
};

