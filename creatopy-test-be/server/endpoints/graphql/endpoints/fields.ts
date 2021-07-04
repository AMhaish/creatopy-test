import modelKeys from "../../../config/ql-models";
export default (ioc: any) => {
  return modelKeys
    .map((val: string) => val.toLowerCase())
    .reduce(
      ({ 
        queries, 
        mutations, 
        //subscriptions 
      }: any, model: any) => ({
        queries: {
          ...require(`./${model}/queries`)(ioc),
          ...queries,
        },
        mutations: {
          ...require(`./${model}/mutations`)(ioc),
          ...mutations
        },
        /*subscriptions: {
          ...require(`./${model}/subscriptions`)(ioc),
          ...subscriptions
        },*/
      }),
      { 
        queries: {},
        mutations: {},
        //subscriptions: {} 
      }
    );
};