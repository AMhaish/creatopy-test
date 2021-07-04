import {
    checkIfUserIsAuthenticated,
    checkIfUserIsRegistered,
    errorUserLoggedIn,
    errorUserRegister,
    forgetPassword,
    loginAction,
    receivedUserLoggedIn,
    receivedUserRegister,
    registerAction,
    resetLogError,
    resetPassword,
    setUserLogout,
} from "../../redux/modules/userAuth/userAuth";
import { notifyUser } from "../../redux/modules/views/views";
// #region action creators types
export type LoginAction = typeof loginAction;
export type ReceivedUserLoggedIn = typeof receivedUserLoggedIn;
export type ErrorUserLoggedIn = typeof errorUserLoggedIn;
export type RegisterAction = typeof registerAction;
export type ReceivedUserRegister = typeof receivedUserRegister;
export type ErrorUserRegister = typeof errorUserRegister;
export type SetUserLogout = typeof setUserLogout;
export type CheckIfUserIsAuthenticated = typeof checkIfUserIsAuthenticated;
export type ResetLogError = typeof resetLogError;
export type notifyUser = typeof notifyUser;
export type forgetPassword = typeof forgetPassword;
export type resetPassword = typeof resetPassword;

export type SetLoadingStateForUserLogin = (time: string) => any;
export type UnsetLoadingStateForUserLogin = (time: string) => any;

export type SetLoadingStateForUserRegister = (time: string) => any;
export type UnsetLoadingStateForUserRegister = (time: string) => any;
// #endregion
