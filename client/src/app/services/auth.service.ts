import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from '../global-variables';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(data: any) {
    return this.http.post(`${GlobalVariables.baseUrl}/auth/signup`, data);
  }

  signIn(data: any) {
    return this.http.post(`${GlobalVariables.baseUrl}/auth/signin`, data);
  }
}
