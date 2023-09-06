import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedUser = jwt_decode(token);
      this.setUser(decodedUser as User);
    }
  }

  private setUser(user: User | null) {
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem('token');
    this.setUser(null);
  }

  redirectToSignIn() {
    this.router.navigate(['/signin']);
  }
}
