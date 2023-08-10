import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './globalVariables';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(data: any) {
    return this.http.post(`${BASE_URL}/auth/signup`, data);
  }

  signIn(data: any) {
    return this.http.post(`${BASE_URL}/auth/signin`, data);
  }
}
