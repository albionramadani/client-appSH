import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../interfaces/gender';
import { AuthService } from '../services/auth-service';
import { RegisterModel } from '../interfaces/register-model';
import { MessageService } from '../services/messages-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showPassword:boolean = false;
  constructor(private auth: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  form = new FormGroup({
    firstName: new FormControl<string | null>(null,Validators.required),
    lastName: new FormControl<string | null>(null,Validators.required),
    email: new FormControl<string | null>(null,Validators.required),
    phoneNumber: new FormControl<string | null>(null,Validators.required),
    gender: new FormControl<Gender | null>(null,Validators.required),
    address: new FormControl<string | null>(null,Validators.required),
    birthday: new FormControl<Date | null>(null,Validators.required),
    password: new FormControl<string | null>(null,Validators.required),
    confirmPassword: new FormControl<string | null>(null,Validators.required)
  })
  genders =Gender;

  protected togglePassword(){
    this.showPassword =!this.showPassword;
  }

  protected save(){
    if(this.form.invalid){
      this.messageService.openError("form is not filled correctly.")
      this.form.markAllAsTouched();
      return
    }
    this.auth.register(this.form.getRawValue() as RegisterModel).subscribe(x=>{
     this.messageService.openSucess('welcome, account is created successfully')
    })
  }

}
