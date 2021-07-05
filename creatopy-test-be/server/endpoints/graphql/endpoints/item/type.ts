import { GraphQLObjectType, GraphQLString } from "graphql";
import userType from "../user/type";

export default new GraphQLObjectType({
  name: "Item",
  description: "User Item",
  fields: {
    title: { type: GraphQLString, description: "The title of the item" },
    id: { type: GraphQLString, description: "The id of the item" },
    createdAt: { type: GraphQLString, description: "The date the item created" },
    user: { type: userType, description: "The owner of the item" },
  },
});
