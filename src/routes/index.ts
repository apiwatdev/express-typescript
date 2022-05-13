import { Express } from "express";

import BookRouter from "./book.router";
export default (app: Express) => {
  app.use("/api/books", BookRouter);
};
