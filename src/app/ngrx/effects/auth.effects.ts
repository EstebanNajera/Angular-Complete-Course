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
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.email,
              token: resData.email,
              expirationDate: expirationDate
            });
          }), catchError((errorRes) => {
            let errorMessage = 'An unknown error occured!';
            if (!errorRes.error || !errorRes.error.error) {
              return of (new AuthActions.LoginFail(errorMessage));
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
            return of(new AuthActions.LoginFail(errorMessage));
          })
        );
    }),
  );

  @Effect({dispatch: false}) authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router
  ) {}

}
