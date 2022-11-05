import { User } from "src/app/models/user.model"
import * as AuthActions  from "../actions/auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const payload = action.payload;
      const newUser: User = new User(payload.email, payload.userId.toString(), payload.token, payload.expirationDate);
      return {
        ...state,
        authError: null,
        user: newUser,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    case AuthActions.AUTO_LOGIN:
      return {
        ...state
      }
    default:
      return state;
  }
}
