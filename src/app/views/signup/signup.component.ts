import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide: boolean = true;
  constructor(private fb: FormBuilder, private AccountService: AccountServiceService, private router: Router) { }
  createUser: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onCreateUser() {
    if (this.createUser.valid) {
      const email = this.createUser.value.email
      const password = this.createUser.value.password
      const name = this.createUser.value.name
      this.AccountService.signup(name, email, password).subscribe(({ data }: any) => {
        const token = data.signup.token;
        localStorage.setItem('token', token);
        this.router.navigate(["/home"])
      })
    }
  }

}
