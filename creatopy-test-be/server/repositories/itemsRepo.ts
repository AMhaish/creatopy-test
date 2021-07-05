import { v4 } from "uuid";
import ItemRepo, { ItemCreationAttributes, ItemInstance } from "../../db/models/item";
import UserRepo from "../../db/models/user";
import { IRepo } from "./iRepo";

export default class AccountRepo implements IRepo<ItemInstance> {

  findAllByField(value: any, filedName: string): Promise<ItemInstance[]> {
    return ItemRepo.findAll({
      where: {
        [filedName]: value,
      },
    });
  }

  findAllIncludingUsers(): Promise<ItemInstance[]> {
    return ItemRepo.findAll({
      include: {
        model: UserRepo, as: "user"
      },
    });
  }

  findAllByWhereClause(whereObj: any): Promise<ItemInstance[]> {
    return ItemRepo.findAll({
      where: whereObj,
    });
  }

  findOne(id: string): Promise<ItemInstance | null> {
    return ItemRepo.findOne({
      where: { id: id },
    });
  }

  findOneByField(value: any, filedName: string): Promise<ItemInstance | null> {
    return ItemRepo.findOne({
      where: { [filedName]: value },
    });
  }

  create(obj: ItemCreationAttributes): Promise<any> {
    obj.id = v4();
    return ItemRepo.create(obj);
  }

  update(id: string, obj: ItemCreationAttributes): Promise<any> {
    return ItemRepo.update({
      title: obj.title,
    }, {
      where: {
        id: id
      }
    });
  }
}