import { OkPacket } from "mysql";
import { execute } from "..";
import { IModel , IUserCreateModel, IUserModel } from "./interface";


export class UserModel implements IModel {

  queries = {
    getUsers: `
    SELECT 
        id, email, password, firstname, lastname, isActive  
    FROM user;`,
    getUsersById: `
    SELECT 
        id, email, password, firstname, lastname, isActive
    FROM
        user
    WHERE id = ?
    `,
    getUserActiveById: `
    SELECT 
        id, email, password, firstname, lastname, isActive
    FROM
        user
    WHERE id = ? and isActive = 1
    `,
    getUsersByEmail: `
    SELECT 
        id, email, password, firstname, lastname, isActive
    FROM
        user
    WHERE email = ?
    `,
    createUser: `
    INSERT INTO user (email, password, firstname, lastname, isActive)
    VALUES (?,?,?,?,?)
    `,
  
  };
  
  find<Type>(): Promise<Type[]> {
    return execute(this.queries.getUsers,[])
  }
  async findById<IUserModel>(id: string | number): Promise<IUserModel | null> {
    const user = await execute<IUserModel[]>(this.queries.getUsersById,[id])
    return user.length > 0 ? user[0] : null
  }
  async findUserActiveById<IUserModel>(id: string | number): Promise<IUserModel | null> {
    const user = await execute<IUserModel[]>(this.queries.getUserActiveById,[id])
    return user.length > 0 ? user[0] : null
  }
  async findByEmail<Type extends IUserModel>(email: string ): Promise<Type | null> {
    const user = await execute<Type[]>(this.queries.getUsersByEmail,[email])
    return user.length > 0 ? user[0] : null
  }
  findOne<IUserModel>(queries: any): Promise<IUserModel> {
    throw new Error("Method not implemented.");
  }
  async create<Type extends IUserCreateModel >(args: Type  ): Promise<Type | null> {
    const result = await execute<OkPacket>(this.queries.createUser,[
      args.email,
      args.password,
      args.firstname,
      args.lastname,
      args?.isActive || 1
    ])

    if(result.affectedRows == 0) return null
    const user = await this.findById<Type>(result.insertId);
    return user
  }
  update<OkPacket>(args: any): Promise<OkPacket> {
    throw new Error("Method not implemented.");
  }
  updateById<IUserModel>(id: string | number, args: IUserModel): Promise<OkPacket> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string | number): Promise<OkPacket> {
    throw new Error("Method not implemented.");
  }
 
}
