import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "Item",
  description: "User Item",
  fields: {
    title: { type: GraphQLString, description: "The title of the item" },
    id: { type: GraphQLString, description: "The id of the item" },
  },
});
