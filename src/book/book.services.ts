import { CRUD } from "../interface/curd.interface";

export class BookService implements CRUD {
  constructor() {}
  async getBooks(){
      return []
  }
  async list(limit: number, page: number) {}
  async create(resource: any) {}
  async updateById(id: string, resource: any) {
    return "";
  }
  async getById(id: string) {
    return "";
  }
  async deleteById(id: string) {
    return "";
  }
  async patchById(id: string, resource: any) {
    return "";
  }
}
