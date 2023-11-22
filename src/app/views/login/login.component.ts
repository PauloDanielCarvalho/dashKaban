import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {

  hide: boolean = true;
  constructor(private fb: FormBuilder, private AccountService: AccountServiceService, private router: Router) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onLogin() {
    if (this.loginForm.valid) {
      
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      this.AccountService.signin(email, password).subscribe(({ data }: any) => {
        const token = data.signin.token;
        localStorage.setItem('token', token);
        this.router.navigate(["/home"])

      })
    }
    return;
  }


}
