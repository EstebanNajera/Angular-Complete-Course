import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '../ngrx/store/app.reducer';
import * as AuthActions from '../ngrx/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpTimer: any;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  public setLogoutTimer(expirationDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  public clearLogoutTimer() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
  }
}
