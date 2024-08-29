const express = require("express");
var cors = require("cors");
require("dotenv").config();
const connectToMongo = require("./db");
connectToMongo();
const app = express();
const port = 3005;
app.use(cors());
app.use(express.json());
//Available Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api", require("./routes/codeFormatter_route"));

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`);
});
