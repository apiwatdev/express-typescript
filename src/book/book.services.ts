import { CRUD } from "../interface/curd.interface";
import { BookModel, execute } from "../mysql";

import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdateBookDTO } from "./dto/update-book.dto";

const books: any = [];
export class BookService implements CRUD {
  bookModel: BookModel;
  constructor() {
    this.bookModel = new BookModel();
  }
  async getBooks() {
    const books = await this.bookModel.getBooks();
    return books;
  }
  async list(limit: number, page: number) {}
  async create(dto: CreateBookDTO) {
    const result = await this.bookModel.addBook({
      title: dto?.title || "",
      description: dto.description,
      author: dto.author,
      publicationDate:
      typeof dto.publicationDate === "string"
          ? new Date(dto.publicationDate)
          : new Date(),
      edition: dto.edition || 1,
    });
    if (result.affectedRows == 0) return null;
    const book = await this.bookModel.getBookById(result.insertId);
    return book;
  }
  async updateById(id: string, dto: UpdateBookDTO) {
    const result = await this.bookModel.updateBookById(+id, {
      title: dto?.title || "",
      description: dto.description,
      author: dto.author,
      publicationDate:
       typeof dto.publicationDate === "string"
          ? new Date(dto.publicationDate)
          : new Date(),
      edition: dto.edition || 1,
    });

    if (result.affectedRows == 0) return null;
    const book = await this.bookModel.getBookById(+id);
    return book;
  }
  async getById(id: string): Promise<Object> {
    return await this.bookModel.getBookById(+id ? +id : 0);
  }
  async deleteById(id: string) {
    return await this.bookModel.deleteBookById(+id);
  }
  async patchById(id: string, resource: any) {
    return "";
  }
}
