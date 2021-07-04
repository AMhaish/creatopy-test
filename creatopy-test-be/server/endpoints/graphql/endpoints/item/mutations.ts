import Services from "../../../../services";
import ItemsService from "../../../../services/itemsService";
import itemType from "./type";
import { GraphQLNonNull, GraphQLString } from "graphql";

function ItemsMutations(ioc: any): any {
  let itemsService: ItemsService = ioc.resolve(Services.ItemsService);
  return {
    addItem: {
      type: itemType,
      args: {
        title: {
          description: "Item title",
          type: new GraphQLNonNull(GraphQLString)
        },
      },
      resolve: async function (
        root: any,
        { title }: { title: string },
        context: any
      ): Promise<any> {
        if (context?.user?.id) {
          let uid: string = context.user.id;
          return await itemsService.createItem(title, uid);
        } else {
          return null;
        }
      }
    }
  };
}

export default ItemsMutations;
module.exports = ItemsMutations;
