import { User } from "src/app/models/user.model"
import * as AuthActions  from "../actions/auth.actions";

export interface State {
  user: User;
}

const initialState = {
  user: null
}

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const payload = action.payload;
      const newUser: User = new User(payload.email, payload.userId, payload.token, payload.expirationDate);
      return {
        ...state,
        user: newUser
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
