import { Express } from "express";
import BookRouter from "../book/book.router";
import AuthRouter from '../auth/auth.router';
export default (app: Express) => {
  app.use("/api/books", BookRouter);
  app.use("/api/auth", AuthRouter);
};
