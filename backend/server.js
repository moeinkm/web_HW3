const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("app:startup");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const users = require("./route/users");
const posts = require("./route/posts");
const auth = require("./route/auth");
const log = require("./middleware/logger");
const cors = require('cors');
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: JWT is not defined.");
  process.exit(1);
}

mongoose.connect("mongodb://localhost/db", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongo db..."))
  .catch((err) => console.log("not connect to mongo", err));


app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(helmet());

app.use("/api/auth",cors(), auth);
app.use("/api/users",cors(), users);
app.use("/api/posts",cors(), posts);

app.use(log);
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgan is enable...");
}

app.use(function (req, res, next) {
  console.log("func1....");
  next();
});

app.listen(8080, () => console.log("listening on port 8080"));



