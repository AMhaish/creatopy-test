import { v4 } from "uuid";
import UserRepo, { UserInstance, UserCreationAttributes } from "../../db/models/user";
import { IRepo } from "./iRepo";

export default class ApiKeyRepo implements IRepo<UserInstance> {
  findAllByField(value: any, filedName: string): Promise<UserInstance[]> {
    return UserRepo.findAll({
      where: {
        [filedName]: value,
      },
    });
  }

  findAllByWhereClause(whereObj: any): Promise<UserInstance[]> {
    return UserRepo.findAll({
      where: whereObj,
    });
  }

  findOne(id: string): Promise<UserInstance | null> {
    return UserRepo.findOne({
      where: { id: id },
    });
  }

  findOneByField(value: any, filedName: string): Promise<UserInstance | null> {
    return UserRepo.findOne({
      where: { [filedName]: value },
    });
  }

  create(obj: UserCreationAttributes): Promise<UserInstance> {
    obj.id=v4();
    return UserRepo.create(obj);
  }

  update(id: string, obj: UserCreationAttributes): Promise<any> {
    return UserRepo.update({
      resetPassToken: obj.resetPassToken,
      resetPassExpires: obj.resetPassExpires,
    }, {
      where: {
        id: id
      }
    });
  }
}
