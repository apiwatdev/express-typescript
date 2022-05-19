import { UserModel } from "../mysql";
import { IUserModel } from "../mysql/model/interface";

export class UserService {
    userModel : UserModel
    constructor(){
        this.userModel = new UserModel()
    }
    async findById(id:number){
        const user = await this.userModel.findById<IUserModel>(id)
        return user
    }

    async findUserActiveById(id:number){
        const user = await this.userModel.findUserActiveById<IUserModel>(id)
        return user
    }
    async findByEmail(email:string){
        const user = await this.userModel.findByEmail<IUserModel>(email)
        return user
    }
}