import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";
import * as fromApp from '../ngrx/store/app.reducer';
import * as AuthActions from '../ngrx/actions/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpTimer: any;
  url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  public signup(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<AuthResponseData>
      (`${this.url}:signUp?key=${environment.firebaseAPIKey}`, body)
      .pipe(catchError(this.handleError),
      tap((resData) => {
        this.handleAuthResponseData(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  public login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<AuthResponseData>
      (`${this.url}:signInWithPassword?key=${environment.firebaseAPIKey}`, body)
      .pipe(catchError(this.handleError),
      tap((resData) => {
        this.handleAuthResponseData(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  public logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }

  public autoLogin() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return;
    }
    const expDate = new Date(userData._tokenExpirationDate);
    const loadedUser = new User(userData.email, userData.id, userData._token, expDate);

    if (loadedUser.token) {
      this.store.dispatch(new AuthActions.AuthenticateSuccess({
        email: loadedUser.email,
        userId: +loadedUser.id,
        token: loadedUser.token,
        expirationDate: expDate
      }));
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }

  public autoLogout(expirationDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthResponseData(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.store.dispatch(new AuthActions.AuthenticateSuccess({
      email: user.email,
      userId: +user.id,
      token: user.token,
      expirationDate: expirationDate
    }));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
