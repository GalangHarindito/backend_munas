const express = require("express");
const app = express();
require("dotenv").config();
const emailRoute = require("./src/routes/Mailer/index")
const cors = require("cors") 


const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

const API = `/api/v1`

app.use(`${API}`, emailRoute)


app.listen(PORT, () => {
  console.log("Listen 5500 ~ ~")
}).on('error', (err) => {
  console.log('on error handler');
});