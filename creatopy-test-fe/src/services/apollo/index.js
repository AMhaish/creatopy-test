// #region imports
import { ApolloClient, InMemoryCache, from, createHttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { apolloConfig } from "../../config";
import { notifyUser } from "../../redux/modules/views/views";
// #endregion

// #region link, middleware
const { networkInterface: uri } = apolloConfig.apollo;
const http_link = createHttpLink({ uri });

// #region get user token from localStorage
async function getUserToken() {
  return new Promise((resolve, reject) => {
    const storedToken = window.localStorage.getItem("token");
    resolve(storedToken);
  });
}
// #endregion


const authLink = setContext(async (operation, { headers }) => {
  const currentUsertoken = await getUserToken();
  if (headers === undefined) {
    headers = {};
  }
  let resultHeaders = currentUsertoken ? { headers: { ...headers, Authorization: `Bearer ${currentUsertoken}`, "Access-Control-Allow-Origin": "*" } } : { headers: { ...headers, "Access-Control-Allow-Origin": "*" } };
  return resultHeaders;
});

// #region cache
const cache = new InMemoryCache();
// #endregion

// #region afterward
const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
  if (networkError && networkError.statusCode === 401) {
    // redirect to login page
    return global.window.location.replace("/login");
  } else if (networkError && networkError.statusCode > 500 && networkError.statusCode !== 503) {
    return global.window.location.replace("/error?message=" + networkError.message);
  } else if (networkError && networkError.statusCode === 403) {
    notifyUser("e", "You are not allowed to do that action since you do not have admin role in this company");
  }
});
// #endregion

// #region environment flag
/* eslint-disable no-process-env */
const isDevEnv = process.env.NODE_ENV !== "production";
/* eslint-enable no-process-env */
// #endregion

const link = from([authLink, errorLink, http_link]);
const client = new ApolloClient({
  link: link,
  cache,
  connectToDevTools: isDevEnv,
  queryDeduplication: true,
  cors: true,
});


export default client;

