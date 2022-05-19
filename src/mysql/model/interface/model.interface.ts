import { OkPacket } from "mysql";

export interface IModel {
   queries: {[key: string]: string};
  find<T>(): Promise<Array<T>>;
  findById<T>(id: string | number): Promise<T |null>;
  findOne<T>(queries: any): Promise<T>;
  create<T>(args: any): Promise<T | null>;
  update<T>(args: any): Promise<T>;
  updateById<T>(id: string | number, args: T): Promise<OkPacket>;
  deleteById(id: string | number): Promise<OkPacket>;
}
