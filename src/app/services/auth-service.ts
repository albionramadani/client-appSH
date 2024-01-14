
import { ForgetModel } from "../interfaces/forget-model";
import { Injectable } from '@angular/core';
import { RegisterModel } from '../interfaces/register-model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { UserModel } from '../interfaces/user-model';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../interfaces/login-model';
import { AuthenticatedModel } from '../interfaces/auth-model';
import LocalStorageHelper from '../helpers/local-storage-heper';
import { RefreshTokenModel } from '../interfaces/refresh-token-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly authKey = 'st.authentication';
  private baseUrl = 'https://localhost:44347/api/';
  private authUser: AuthenticatedModel | null = null;
  private authUser$ = new BehaviorSubject<AuthenticatedModel | null>(null!);
    constructor(public http: HttpClient){}
    public forgetpassword(model: ForgetModel): Observable<string> {
      const endpoint = `${this.baseUrl}accounts/forget-password`;

      return this.http.post<string>(endpoint, {email: model.email});
    }
  public register(model: RegisterModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.baseUrl + `accounts/register`, {
      ...model,
    } as RegisterModel);
  }

  public logIn(model: LoginModel): Observable<AuthenticatedModel> {
    return this.http.post<AuthenticatedModel>(
      this.baseUrl + 'auth/Authenticate',
      { ...model } as LoginModel
    );
  }
  public setLoginModel(model: AuthenticatedModel) {
    if (model) {
      LocalStorageHelper.setItemFromObject(AuthService.authKey, model);
      this.authUser = model;
    } else {
      LocalStorageHelper.clear(AuthService.authKey);
    }
  }

  public updateUserData(model: UserModel):Observable<void>{
    return this.http.post<void>(this.baseUrl+'accounts/update',model);
  }

  public logout() {
    LocalStorageHelper.clear(AuthService.authKey);
    this.authUser = null;
    this.authUser$.next(null);
  }

  public getCurrenUserData(): Observable<UserModel> {
    return this.http.get<UserModel>(this.baseUrl + 'accounts');
  }

  public isLoggedIn() {
    return this.authenticatedModel()?.id != null;
  }

  public authenticatedModel(): AuthenticatedModel {
    return LocalStorageHelper.getItemFormObject(AuthService.authKey)!;
  }

  public getToken() {
    return this.authenticatedModel()?.token;
  }

  public getRefreshToken() {
    let token = this.authenticatedModel()?.refreshToken;

    if (!token) {
      return null;
    }

    return token!;
  }

  public getLoginUrl(redirectUrl?: string) {
    return 'product';
  }

  refreshToken(
    refreshToken?: string | null
  ): Observable<AuthenticatedModel | null> {
    if (!refreshToken) {
      refreshToken = this.getRefreshToken();
    }

    if (refreshToken) {
      const refreshModel: RefreshTokenModel = {
        refreshToken: refreshToken,
      };
      return this.refreshToken(refreshModel?.refreshToken).pipe(
        tap((loggedInModel: AuthenticatedModel | null) => {
          this.setLoginModel(loggedInModel!);

          return loggedInModel;
        })
      );
    } else {
      return of(null);
    }
  }
}
