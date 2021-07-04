import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware, connectRouter } from "connected-react-router";
import rootReducer, { history } from "../modules/reducers";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
// #endregion

const loggerMiddleware = createLogger({
  level: "info",
  collapsed: true,
});

const enhancers = [];
const middleware = [thunk, loggerMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore<any, any, any, any>((connectRouter(history) as any)(rootReducer), undefined, composedEnhancers);

export default store;
