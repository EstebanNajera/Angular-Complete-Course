import { HttpClient } from "@angular/common/http";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import * as AuthActions from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

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

  handleAuthentication = (email: string, userId: number, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    return new AuthActions.AuthenticateSuccess({
      email: email,
      userId: email,
      token: email,
      expirationDate: expirationDate
    });
  }

  handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return of (new AuthActions.AuthenticateFail(errorMessage));
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email wasn\'t found';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      default:
        break;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  @Effect() authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      const body = {
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true
      }
      return this.http.post<AuthResponseData>
        (`${this.url}:signUp?key=${environment.firebaseAPIKey}`, body).pipe(
          map((resData) => {
            return this.handleAuthentication(resData.email, +resData.localId, resData.idToken, +resData.expiresIn)
          }), catchError((error) => {
            return this.handleError(error);
          })
        );
    })
  );

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
          map((resData) => {
            return this.handleAuthentication(resData.email, +resData.localId, resData.idToken, +resData.expiresIn)
          }), catchError((error) => {
            return this.handleError(error);
          })
        );
    }),
  );

  @Effect({dispatch: false}) authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/recipes']);
    })
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router
  ) {}

}
