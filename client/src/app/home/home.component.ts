import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.user = jwt_decode(token);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }

  redirectToSignIn() {
    this.router.navigate(['/signin']);
  }
}
