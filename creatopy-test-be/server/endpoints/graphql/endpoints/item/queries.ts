import { GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import itemType from "./type";
import Services from "../../../../services";
import ItemsService from "../../../../services/itemsService";

function ItemsQueries(ioc: any) {
  let itemsService: ItemsService = ioc.resolve(Services.ItemsService);
  return {
    items: {
      type: GraphQLList(itemType),
      args: {},
      resolve: async function (root: any, args: any, context: any) {
        return await itemsService.getItems();
      },
    },
  };
};

export default ItemsQueries;
module.exports = ItemsQueries;