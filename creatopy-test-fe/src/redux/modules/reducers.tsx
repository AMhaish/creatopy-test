import { combineReducers } from "redux";
import userAuth from "./userAuth/userAuthReducer";
//import item from "./item/item";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

const appReducers: any = {
  userAuth,
};

export default combineReducers({
  ...appReducers,
  router: connectRouter(history),
});
