import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/auth-response';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [AuthService],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;

  error: string = "";

  constructor(private authService: AuthService) {}

  onToggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const email = form.value.email;
    const password = form.value.password;

    let authResponse: Observable<AuthResponse>;
    this.isLoading = true;

    if (this.isLoginMode) {
      console.log('Login mode...');
      authResponse = this.authService.login(email, password)
    } else {
      authResponse = this.authService.signUp(email, password)
    }

    authResponse.subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      }
    })
    form.reset();
  }

}
