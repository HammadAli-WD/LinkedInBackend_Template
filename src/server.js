const express = require("express")
const listEndPoints = require("express-list-endpoints")
const cors = require("cors")
const { join } = require("path")
const mongoose = require("mongoose")
const apiRoutes = require("./routes/api")
const { notFound, badRequest, generalError } = require("./errorHandlers")
const port = process.env.PORT || 3003;
const publicPath = join(__dirname, "../public");

const server = express();
//server.use(helmet());

//const whiteList = process.env.WL;

/* const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
}; */

server.use(express.json());
server.use(cors());
server.use(express.static(publicPath));

server.use("/api", apiRoutes);
//server.use("/user", authorizeRoutes);

server.use(notFound);
server.use(badRequest);
server.use(generalError);

console.log(listEndpoints(server));
//mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dn7fa.mongodb.net/${process.env.DB_NAME}

mongoose
  .connect(
    "mongodb://localhost:27017/template",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(
    server.listen(port, () => {
      console.log(`Server running on port : ${port}`);
    })
  )
  .catch((err) => console.log(err));