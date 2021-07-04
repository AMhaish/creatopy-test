import { GraphQLObjectType, GraphQLSchema } from "graphql";
import Fields from "../endpoints/graphql/endpoints/fields";
export default (ioc: any) => {
  const {
    queries,
    mutations,
    //subscriptions 
  } = Fields(ioc); // subscriptions
  return new GraphQLSchema({
    query: new GraphQLObjectType<any, any, any>({
      name: "RootQuery",
      fields: () => queries,
    }),
    mutation: new GraphQLObjectType({
      name: "RootMutation",
      fields: () => mutations,
    }),
    /*subscription: new GraphQLObjectType({
      name: "RootSubscriptions",
      fields: () => subscriptions,
    }),*/
  });
};