interface IUserModel {
  id: number;
  email: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  isActive?: boolean;
}

interface IUserCreateModel {

  email: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  isActive?: boolean;
}


export {IUserModel,IUserCreateModel};
