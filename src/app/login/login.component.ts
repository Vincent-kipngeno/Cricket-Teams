import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: String = "";

  formData: FormGroup;

  @ViewChild('alertDanger') alertDanger!: ElementRef;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.formData = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    if (this.formData.valid) {
      const email = this.formData.get('email')?.value;
      const password = this.formData.get('password')?.value;

      this.authService.login(email, password).subscribe(response => {
        if (response.length !== 0 && response[0].password == password) {
          this.router.navigate(['/']);
        } else {
          console.log("Hi!");
          this.showAlert();
        }
      });
    }
  }

  showAlert() {
    this.alertDanger.nativeElement.style.display = 'block';
    setTimeout(() => {
      this.alertDanger.nativeElement.style.display = 'none';
    }, 2000); // Hide the alert after 2 seconds (2000 milliseconds)
  }
}
