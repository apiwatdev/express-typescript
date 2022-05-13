import { NextFunction, Request, Response } from "express";
import { BookService } from "./book.services";
export class BookController {
  bookService: BookService;
  constructor() {
    this.bookService = new BookService();
  }
  async getBooks(req: Request, res: Response, next: NextFunction) {
    return res.send(await this.bookService.getBooks());
  }
  async getBookById(req: Request, res: Response, next: NextFunction) {
    return res.send(await this.bookService.getBooks());
  }
  async createBook(req: Request, res: Response, next: NextFunction) {
    return res.send(await this.bookService.getBooks());
  }
  async updateBookById(req: Request, res: Response, next: NextFunction) {
    return res.send(await this.bookService.getBooks());
  }
  async deleteBookById(req: Request, res: Response, next: NextFunction) {
    return res.send(await this.bookService.getBooks());
  }
}
