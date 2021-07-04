import { User, UserCall } from "../../../models/objects/user";
import Auth from "../../../services/auth";

// #region constants
export const CHECK_IS_USER_IS_AUTHENTICATED = "CHECK_IS_USER_IS_AUTHENTICATED";
export const CHECK_IS_USER_IS_REGISTERED = "CHECK_IS_USER_IS_REGISTERED";

export const RECEIVED_USER_LOGGED_IN = "RECEIVED_USER_LOGGED_IN";
export const ERROR_USER_LOGGED_IN = "ERROR_USER_LOGGED_IN";

export const SET_LOADING = "SET_LOADING";
export const UNSET_LOADING = "UNSET_LOADING";

export const RECEIVED_USER_REGISTER = "RECEIVED_USER_REGISTER";
export const ERROR_USER_REGISTER = "ERROR_USER_REGISTER";

export const SET_USER_LOGOUT = "SET_USER_LOGOUT";

export const RESET_LOG_ERRORS = "RESET_LOG_ERRORS";

export const FORGET_PASSWORD_SUCCEED = "FORGET_PASSWORD_SUCCEED";
export const ERROR_FORGET_PASSWORD = "ERROR_FORGET_PASSWORD";

export const RESET_PASSWORD_SUCCEED = "RESET_PASSWORD_SUCCEED";
export const ERROR_RESET_PASSWORD = "ERROR_RESET_PASSWORD";

export const emptyUser: User = Auth.getUserInfo() ?? {
  id: "",
  email: "",
  createdAt: "",
  updatedAt: "",
};

export const initialState: UserCall = {
  isAuthenticated: false,
  mutationLoading: false,
  status: undefined,
  error: undefined,
  ...emptyUser,
};
// #endregion
