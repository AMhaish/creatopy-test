import { User, UserCall } from "../../../models/objects/user";
import {
  RECEIVED_USER_LOGGED_IN,
  RECEIVED_USER_REGISTER,
  FORGET_PASSWORD_SUCCEED,
  RESET_PASSWORD_SUCCEED,
  ERROR_USER_LOGGED_IN,
  ERROR_USER_REGISTER,
  ERROR_FORGET_PASSWORD,
  ERROR_RESET_PASSWORD,
  SET_LOADING,
  UNSET_LOADING,
  CHECK_IS_USER_IS_AUTHENTICATED,
  CHECK_IS_USER_IS_REGISTERED,
  SET_USER_LOGOUT,
  RESET_LOG_ERRORS,
  initialState,
} from "./userAuthConstants";

const userAuthReducer: any = (state: UserCall = initialState, action: any) => {
  switch (action.type) {
    case RECEIVED_USER_LOGGED_IN:
    case RECEIVED_USER_REGISTER:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        id: action.user.id,
        email: action.user.email,
        createdAt: action.user.createdAt,
        updatedAt: action.user.modifiedAt,
        error: null,
        status: action.status,
      };
    case FORGET_PASSWORD_SUCCEED:
    case RESET_PASSWORD_SUCCEED:
      return {
        ...state,
        
        isAuthenticated: action.isAuthenticated,
        error: null,
        status: action.status,
        success: { ...action.success },
      };
    case ERROR_USER_LOGGED_IN:
    case ERROR_USER_REGISTER:
    case ERROR_FORGET_PASSWORD:
    case ERROR_RESET_PASSWORD:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        // errors:
        error: { ...action.error },
        status: action.status,
      };
    case SET_LOADING:
    case UNSET_LOADING:
      return {
        ...state,
        mutationLoading: action.loading,
      };
    case CHECK_IS_USER_IS_AUTHENTICATED:
    case CHECK_IS_USER_IS_REGISTERED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        // user infos from storage if authenticated:
        id: action.user.id,
        email: action.user.email,
        createdAt: action.user.createdAt,
        updatedAt: action.user.modifiedAt,
        status: undefined,
      };
    case SET_USER_LOGOUT:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        id: action.user.id,
        email: action.user.username,
        lastLogin: action.user.lastLogin,
        createdAt: action.user.createdAt,
        updatedAt: action.user.modifiedAt,
        status: undefined,
      };
    case RESET_LOG_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
        error: null,
        success: null,
        status: undefined,
      };
  }
}

export default userAuthReducer;