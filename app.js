const express = require('express');

//Models
const { User } = require('./models/user.model');
const { Repair } = require('./models/repair.model');

//init express app

const app = express();

//Routers
const { usersRouter } = require('./routes/users.routes');
const { repairsRouter } = require('./routes/repairs.routes');

//Utils
const { db } = require('./utils/database');

//Enable incoming Json data
app.use(express.json());

//Endpoints

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

//Authenticate databse credentials

db.authenticate()
  .then(() => console.log('Databse autenticated'))
  .catch(err => console.log(err));

// Establish models relations
User.hasMany(Repair, { foreignKey: 'userId' });
Repair.belongsTo(User);

//sync sequilize models
db.sync()
  .then(() => console.log('Databse sync'))
  .catch(err => console.log(err));

//spin up server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('express runnning');
});
