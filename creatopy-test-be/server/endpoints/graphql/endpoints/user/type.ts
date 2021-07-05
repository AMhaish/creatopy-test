import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "User",
  description: "User",
  fields: {
    email: { type: GraphQLString, description: "The email of the user" },
    id: { type: GraphQLString, description: "The id of the user" },
  },
});
