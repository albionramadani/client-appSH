import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/messages-service';
import { AuthService } from '../services/auth-service';
import { LoginModel } from '../interfaces/login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword:boolean = false;
  constructor(private messageService: MessageService,
    private authService: AuthService,
    private router:Router) { }

  form = new FormGroup({
    email: new FormControl<string | null>(null,Validators.required),
    password: new FormControl<string | null>(null,Validators.required)
  })

  ngOnInit() {
  }

  protected togglePassword(){
    this.showPassword =!this.showPassword;
  }

  protected login(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      this.messageService.openError('please fill all required fields!');
      return
    }

    this.authService.logIn(this.form.getRawValue() as LoginModel)
    .subscribe(x=> {
      this.authService.setLoginModel(x!);
      this.messageService.openSucess('you are logged in succsessfully');
      this.router.navigate(["/products"])
    })


  }

}
