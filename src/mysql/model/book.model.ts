import { OkPacket } from "mysql";
import { execute } from "..";

export interface IBookModel {
  id?: number;
  title: string;
  description?: string;
  author?: string;
  publicationDate: Date;
  edition: number;
}

export class BookModel {
  queries = {
    getBooks: `
        SELECT 
        id, title, description, author, publicationDate, edition
        FROM
        book;
        `,
    getBookById: `
        SELECT 
        id, title, description, author, publicationDate, edition
        FROM
            book
        WHERE 
        id = ?`,
    addBook: `
        INSERT INTO book(title, description, author, publicationDate, edition) 
        VALUE (?,?,?,?,?);`,
    updateById: `
        UPDATE book 
        SET title = ? , description = ? , author = ? , publicationDate = ? , edition = ?
        WHERE id = ?;
    `,
    deleteById: `
        DELETE FROM book WHERE id = ?
    `,
  };

  constructor() {}

  async getBooks(): Promise<Array<IBookModel>> {
    return await execute(this.queries.getBooks, []);
  }

  async addBook(args: IBookModel): Promise<OkPacket> {
    return await execute(this.queries.addBook, [
      args.title,
      args.description,
      args.author,
      args.publicationDate,
      args.edition,
    ]);
  }

  async getBookById(id: number): Promise<IBookModel> {
    const books = await execute<IBookModel[]>(this.queries.getBookById, [id]);
    return books[0];
  }

  async updateBookById(id: number, args: IBookModel): Promise<OkPacket> {
    return await execute(this.queries.updateById, [
      args.title,
      args.description,
      args.author,
      args.publicationDate,
      args.edition,
      id,
    ]);
  }

  async deleteBookById(id: number): Promise<OkPacket> {
    return await execute<OkPacket>(this.queries.deleteById, [id]);
  }
}
