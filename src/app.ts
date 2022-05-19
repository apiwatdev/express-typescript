import express from "express";
import 'dotenv/config'
import morgan from "morgan";
import routes from "./routes";
import * as MySQL from "./mysql";
import { errorMiddleware } from "./middleware";

const app = express();

app.use(morgan('tiny'))
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create database pool
MySQL.inti()

routes(app)

app.use(errorMiddleware)
app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});
