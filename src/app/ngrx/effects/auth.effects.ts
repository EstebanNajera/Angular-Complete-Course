import { HttpClient } from "@angular/common/http";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import * as AuthActions from '../actions/auth.actions';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  @Effect() authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const body = {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      };
      return this.http.post<AuthResponseData>
        (`${this.url}:signInWithPassword?key=${environment.firebaseAPIKey}`, body).pipe(
          map(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return of(new AuthActions.Login({
              email: resData.email,
              userId: resData.email,
              token: resData.email,
              expirationDate: expirationDate
            }));
          }), catchError((error) => {
            return of();
          })
        );
    }),

  );

  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) {}

}
