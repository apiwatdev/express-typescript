import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../enum/http-status-code";
import { validateRequestBodyDto } from "../validator";
import { BookService } from "./book.services";
import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdateBookDTO } from "./dto/update-book.dto";

export class BookController {
  bookService: BookService;
  constructor() {
    this.bookService = new BookService();
  }
  async getBooks(req: Request, res: Response, next: NextFunction) {
    return res.send(await this.bookService.getBooks());
  }
  async getBookById(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    return res.send(await this.bookService.getById(id));
  }
  async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = await validateRequestBodyDto(CreateBookDTO, req.body);
      if (dto.error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({
          statusCode: HttpStatusCode.BAD_REQUEST,
          error: "Bad Request",
          ...dto.error,
        });
      } else {
        const book = await this.bookService.create(dto.data);
        return res.json(book);
      }
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
      const dto = await validateRequestBodyDto(UpdateBookDTO, req.body);
      if (dto.error) {
        res.status(HttpStatusCode.BAD_REQUEST).send({
          statusCode: HttpStatusCode.BAD_REQUEST,
          error: "Bad Request",
          ...dto.error,
        });
      } else {
        const book = await this.bookService.updateById(id, dto.data);
        return res.json(book);
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
    await this.bookService.deleteById(id);
    res.status(HttpStatusCode.ACCEPTED).send()
  }
}
