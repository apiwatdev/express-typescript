import { CRUD } from "../interface/curd.interface";
import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdateBookDTO } from "./dto/update-book.dto";

const books: any = []
export class BookService implements CRUD {
  constructor() {}
  async getBooks(){
      return books
  }
  async list(limit: number, page: number) {}
  async create(dto: CreateBookDTO) {
    books.push(dto)
    return dto
  }
  async updateById(id: string, dto: UpdateBookDTO) {
    return {id,...dto};
  }
  async getById(id: string) : Promise<Object> {
    return {};
  }
  async deleteById(id: string) {
    return "";
  }
  async patchById(id: string, resource: any) {
    return "";
  }
}
