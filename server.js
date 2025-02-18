const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

//connecting to the database
const mongoose = require('mongoose');

//asynchronous DB connection with parameterized DB connection string
mongoose.connect(
  `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}?retryWrites=true&w=majority `
)
  .then(() => console.log(`MongoDB Connected Successfully`))
  .catch(err => console.error(`MongoDB Connection Error: ${err}`));