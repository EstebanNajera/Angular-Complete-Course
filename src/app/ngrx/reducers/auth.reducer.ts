import { User } from "src/app/models/user.model"

export interface State {
  user: User;
}

const initialState = {
  user: null
}

export function authReducer(state: State = initialState, action) {
  return state
}
