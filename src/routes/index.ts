import { Express } from "express";

import BookRouter from "../book/book.router";
export default (app: Express) => {
  app.use("/api/books", BookRouter);
};
