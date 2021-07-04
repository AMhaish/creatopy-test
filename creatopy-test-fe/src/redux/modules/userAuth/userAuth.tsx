// #region imports
import { auth } from "../../../services/auth";
import { User } from "../../../models/objects/user";
import { backendAuthPath } from "../../../config";
import {
  CHECK_IS_USER_IS_AUTHENTICATED,
  CHECK_IS_USER_IS_REGISTERED,
  emptyUser,
  ERROR_FORGET_PASSWORD,
  ERROR_RESET_PASSWORD,
  ERROR_USER_LOGGED_IN,
  ERROR_USER_REGISTER,
  FORGET_PASSWORD_SUCCEED,
  RECEIVED_USER_LOGGED_IN,
  RECEIVED_USER_REGISTER,
  RESET_LOG_ERRORS,
  RESET_PASSWORD_SUCCEED,
  SET_LOADING,
  SET_USER_LOGOUT,
  UNSET_LOADING,
} from "./userAuthConstants";
import { POST_OPTIONS } from "../../../helper/utils";
// #endregion

// #region  action creators
// //////////////////
// login action:
// //////////////////
export function loginAction(
  email: string,
  password: string,
  keepMeLoggedIn: boolean
) {
  return async (dispatch: Function) => {
    dispatch(setLoading());
    try {
      const res = await fetch(backendAuthPath + "/signin", {
        ...POST_OPTIONS,
        body: JSON.stringify({ email: email, password: password }),
      });
      const status = typeof res.status !== "number" ? parseInt(res.status) : res.status;
      if (status === 200) {
        const json: any = await res.json();
        dispatch(
          receivedUserLoggedIn(status, json.token, json.user, keepMeLoggedIn)
        );
      } else {
        dispatch(errorUserLoggedIn(status));
      }
    } catch (reason) {
      dispatch(errorUserLoggedIn(500, reason));
    }
    dispatch(unsetLoading());
  };
}
// //////////////////
// Forget password action:
// //////////////////
export function forgetPassword(
  email: string,
) {
  return async (dispatch: Function) => {
    try {
      dispatch(setLoading());
      const res = await fetch(backendAuthPath + "/forgot", {
        ...POST_OPTIONS,
        body: JSON.stringify({ email, isFromLive: true }),
      });
      if (res.status === 200) {
        dispatch(successForgetpassword(res.status, (res as any).response));
      } else {
        dispatch(errorForgetpassword(res.status, (res as any).response));
      }
    } catch (reason) {
      dispatch(errorForgetpassword(500, reason));
    }
    dispatch(unsetLoading());
  };
}
// //////////////////
// Reset password action:
// //////////////////
export function resetPassword(
  password: string,
  token: string,
) {
  return async (dispatch: Function) => {
    dispatch(setLoading());
    try {
      const res = await fetch(backendAuthPath + "/reset/" + token, {
        ...POST_OPTIONS,
        body: JSON.stringify({ password }),
      });
      if (res.status === 200) {
        dispatch(successResetpassword(res.status, (res as any).response));
      } else {
        dispatch(errorResetpassword(res.status, (res as any).response));
      }
    } catch (reason) {
      dispatch(errorResetpassword(500, reason));
    }
    dispatch(unsetLoading());
  };
}
// //////////////////
// login sucess:
// //////////////////
export function receivedUserLoggedIn(
  status: number,
  userToken: string = null as any,
  user: User = emptyUser,
  keepMeLoggedIn: boolean,
) {
  const isAuthenticated: boolean = userToken ? true : false;
  auth.clearAllAppStorage(); // clear previous token
  auth.setToken(userToken); // set token to default store = localStorage and to default token key = 'token'
  auth.setUserInfo(user);
  return {
    type: RECEIVED_USER_LOGGED_IN,
    isAuthenticated,
    user,
    status,
  };
}
// //////////////////
// login error:
// //////////////////
export function errorUserLoggedIn(
  status: number,
  error: any = null,
) {
  auth.clearAllAppStorage(); // clear previous token
  return {
    type: ERROR_USER_LOGGED_IN,
    error,
    isAuthenticated: false,
    status,
  };
}
// //////////////////
// forget password error:
// //////////////////
export function errorForgetpassword(
  status: number,
  error: any = null,
) {
  return {
    type: ERROR_FORGET_PASSWORD,
    error: { message: error },
    isAuthenticated: false,
    status,
  };
}
// //////////////////
// forget password success:
// //////////////////
export function successForgetpassword(
  status: number,
  success: any = null,
) {
  return {
    type: FORGET_PASSWORD_SUCCEED,
    success: { message: success },
    isAuthenticated: false,
    status,
  };
}
// //////////////////
// Reset password error:
// //////////////////
export function errorResetpassword(
  status: number,
  error: any = null,
) {
  return {
    type: ERROR_RESET_PASSWORD,
    error: { message: error },
    isAuthenticated: false,
    status,
  };
}
// //////////////////
// Reset password success:
// //////////////////
export function successResetpassword(
  status: number,
  success: any = null,
) {
  return {
    type: RESET_PASSWORD_SUCCEED,
    success: { message: success },
    isAuthenticated: false,
    status,
  };
}
// /////////////////////////////
// set loading state
// /////////////////////////////
export function setLoading() {
  return {
    type: SET_LOADING,
    loading: true,
  };
}
// /////////////////////////////
// unset loading state
// /////////////////////////////
export function unsetLoading() {
  return {
    type: UNSET_LOADING,
    loading: false,
  };
}
// //////////////////
// register action:
// //////////////////
export function registerAction(
  user: User,
) {
  return async (dispatch: Function) => {
    dispatch(setLoading());
    try {
      const res = await fetch(backendAuthPath + "/signup", {
        ...POST_OPTIONS,
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      const status =
        typeof res.status !== "number" ? parseInt(res.status) : res.status;
      if (status === 200) {
        const json: any = await res.json();
        dispatch(receivedUserRegister(status, json.token, json));
      } else {
        dispatch(errorUserLoggedIn(status));
      }
    } catch (error) {
      dispatch(errorUserRegister(500, error));
    }
    dispatch(unsetLoading());
  };
}
// //////////////////
// register sucess:
// //////////////////
export function receivedUserRegister(
  status: number,
  userToken: string,
  user: User = emptyUser,
) {
  auth.clearAllAppStorage(); // clear previous token
  auth.setToken(userToken); // set token to default store = localStorage and to default token key = 'token'
  auth.setUserInfo(user);

  return {
    type: RECEIVED_USER_REGISTER,
    user,
    status,
    isAuthenticated: false,
  };
}
// //////////////////
// register error:
// //////////////////
export function errorUserRegister(
  status: number,
  error: any = null,
) {
  auth.clearAllAppStorage(); // clear previous token

  return {
    type: ERROR_USER_REGISTER,
    error,
    isAuthenticated: false,
    status,
  };
}

// //////////////////
// user logout:
// //////////////////
export function setUserLogout() {
  auth.clearAllAppStorage();
  return {
    type: SET_USER_LOGOUT,
    isAuthenticated: false,
    user: emptyUser,
  };
}
// //////////////////////////////
// check user auth (check token)
// //////////////////////////////
export function checkIfUserIsAuthenticated() {
  const user: User | null = auth.getUserInfo() ? auth.getUserInfo() : emptyUser;
  // need token and user info in localStorage to be authenticated
  const isAuthenticated: boolean =
    auth.isAuthenticated() && checkUserHasId(user as User) ? true : false;

  return {
    type: CHECK_IS_USER_IS_AUTHENTICATED,
    isAuthenticated: isAuthenticated,
    user,
  };
}

function checkUserHasId(user: User) {
  // $FlowIgnore
  return user && user.id && user.id.length > 0;
}

// //////////////////////////////
// check user registered
// //////////////////////////////
export function checkIfUserIsRegistered() {
  const user: User | null = auth.getUserInfo() ? auth.getUserInfo() : emptyUser;
  return {
    type: CHECK_IS_USER_IS_REGISTERED,
    user,
  };
}

// ////////////////////////////////
// reset login and register error:
// ////////////////////////////////
export function resetLogError() {
  return {
    type: RESET_LOG_ERRORS,
  };
}

// #endregion
