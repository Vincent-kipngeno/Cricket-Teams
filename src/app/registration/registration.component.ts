import { Component } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  formData: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.formData = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')!.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')!.setErrors(null);
    }
  }

  signup() {
    if (this.formData.valid) {
      const userData = {
        firstname: this.formData.get('firstname')?.value,
        lastname: this.formData.get('lastname')?.value,
        email: this.formData.get('email')?.value,
        password: this.formData.get('password')?.value,
        confirmPassword: this.formData.get('confirmPassword')?.value
      };

      this.authService.signUp(userData).subscribe(response => {
        if (response) {
          // Navigation only if response is not null
          this.router.navigate(['/']);
        } else {
          // Handle error or display message
        }
      });
    }
  }

}
