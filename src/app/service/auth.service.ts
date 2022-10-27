import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../models/user.model";

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
  user = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public signup(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsbtaWH2bAwEnWvoU1_mcjze-r5eLhJ4U', body)
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
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsbtaWH2bAwEnWvoU1_mcjze-r5eLhJ4U', body)
      .pipe(catchError(this.handleError),
      tap((resData) => {
        this.handleAuthResponseData(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  public logout() {
    this.user.next(null);
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
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
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
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
