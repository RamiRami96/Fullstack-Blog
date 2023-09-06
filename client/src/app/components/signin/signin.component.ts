import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signIn() {
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm.value).subscribe({
        next: (res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem('token', token);
            this.router.navigate(['/']);
          }
        },
        error: console.error,
      });
    }
  }
}
