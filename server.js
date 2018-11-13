const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const color = require("colors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://shifat:shifat1@ds049157.mlab.com:49157/mern_with_gql",
  { useNewUrlParser: true },
  () => {
    console.log(
      color.magenta("==> A database connection has been established")
    );
  }
);
mongoose.set("useCreateIndex", "true");

const schema = require("./Schema/schema");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

// For Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(color.green(`==> Server is running on http://localhost:${port}`));
});
