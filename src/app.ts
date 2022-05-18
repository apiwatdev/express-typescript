import express from "express";
import 'dotenv/config'
import morgan from "morgan";
import routes from "./routes";
import * as MySQL from "./mysql";


morgan('tiny')

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create database pool
MySQL.inti()

routes(app)

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});
