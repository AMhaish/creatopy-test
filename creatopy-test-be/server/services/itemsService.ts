import ItemsRepo from "../repositories/itemsRepo";
import LoggingService from "./loggingService";
import Constants from "../utils/constants";
import BusinessException from "../exceptions/business/businessException";
import Item from "../models/item";
import { Utils } from "../utils/utils";

export default class ItemsService {
  constructor(
    private logger: LoggingService,
    private itemsRepo: ItemsRepo,
  ) {
  }

  async createItem(title: string, userId: string): Promise<any> {
    return await this.itemsRepo.create({
      title: title,
      userId: userId
    });
  }

  async getItems(userId: string): Promise<Item[]> {
    const items: Item[] = await this.itemsRepo.findAllByField(userId, Utils.nameOf<Item>("userId"));
    return items.map((item) => ({
      id: item.id,
      title: item.title,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      userId: item.userId,
    }));
  }
}



