import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../enum/http-status-code";
import { HttpException } from "../exception";
import { BookService } from "./book.service";
import { CreateBookDto, UpdateBookDto } from "./dto";

export class BookController {
  bookService: BookService;
  constructor() {
    this.bookService = new BookService();
  }
  async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
  
      return res.send(await this.bookService.getBooks());
    } catch (error) {
      next(new HttpException());
    }
  }
  async getBookById(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const book = await this.bookService.getById(id);
      if (book) {
        res.send(book);
      } else {
        next(
          new HttpException(
            HttpStatusCode.NOT_FOUND,
            `Book with id ${id} not found.`
          )
        );
      }
    } catch {
      next(new HttpException());
    }
  }
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const dto: CreateBookDto = req.body;
      const book = await this.bookService.create(dto);
      return res.send(book);
    } catch (error) {
      next(error);
    }
  }
  async updateBookById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const dto: UpdateBookDto = req.body;
      const book = await this.bookService.updateById(id, dto);
      if (book) {
        return res.json(book);
      } else {
        next(
          new HttpException(
            HttpStatusCode.NOT_FOUND,
            `Book with id ${id} not found.`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteBookById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const result = await this.bookService.deleteById(id);
    if (result != 0) {
      res.status(HttpStatusCode.ACCEPTED).send();
    } else {
      next(
        new HttpException(
          HttpStatusCode.NOT_FOUND,
          `Book with id ${id} not found.`
        )
      );
    }
  }
}
