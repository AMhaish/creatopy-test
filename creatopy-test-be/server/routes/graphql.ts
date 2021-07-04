import { ApolloServer } from "apollo-server-express";
import { Container, IInstanceWrapper } from "addict-ioc";
import { Application } from "express";
import { Server } from "http";
import expressPlayground from "graphql-playground-middleware-express";
import GQLSchema from "../config/ql-schema";
import LoggingService from "../services/loggingService";

const graphQLConf = (httpServer: Server, app: Application, ioc: Container<IInstanceWrapper<any>>, logger: LoggingService) => {
  const graphQLPath: string = "/graphql";
  const schema: any = GQLSchema(ioc);
  const apolloServer: ApolloServer = new ApolloServer({
    schema,
    subscriptions: {
      path: graphQLPath,
      onConnect: async (connectionParams: any) => {
        /*Doing socket authorization*/
      },
    },
    introspection: true,
    context: ({ req }: { req: any }) => ({ user: req.user }),
  });
  apolloServer.applyMiddleware({
    app,
    path: graphQLPath,
  });
  // apolloServer.installSubscriptionHandlers(httpServer);
  app.get("/playground", expressPlayground({ endpoint: "/graphql", subscriptionEndpoint: "http://localhost:8000/graphql" }));
  logger.logInfo(`Running a GraphQL API server at ${apolloServer.graphqlPath}`, "GraphQl routes");
  // logger.logInfo(`Subscriptions ready at ${apolloServer.subscriptionsPath}`, "GraphQl routes");
};

export default graphQLConf;
