const express = require("express");

const app = express();
const PORT = 4000;

//Routers
const { usersRouter } = require("./routes/users.routes");
const { repairsRouter } = require("./routes/repairs.routes");

//Utils
const { db } = require("./utils/database");

//Enable incoming Json data
app.use(express.json());

//Endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/repairs", repairsRouter);

db.authenticate()
  .then(() => console.log("Databse autenticated"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Databse sync"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("express runnning");
});
