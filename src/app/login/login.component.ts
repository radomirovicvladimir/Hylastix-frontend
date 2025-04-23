import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  isRegisterMode = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.isRegisterMode) {
      this.authService.register(this.username, this.password).subscribe({
        next: () => {
          this.isRegisterMode = false;
          this.errorMessage = '';
        },
        error: () => this.errorMessage = 'Username already taken'
      });
    } else {
      this.authService.login(this.username, this.password).subscribe({
        next: () => {
          this.errorMessage = '';
          this.router.navigate(['/items']);
        },
        error: () => this.errorMessage = 'Invalid credentials'
      });
    }
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
  }
}
