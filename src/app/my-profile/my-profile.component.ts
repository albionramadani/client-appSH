import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Gender } from '../interfaces/gender';
import { take } from 'rxjs';
import { UserModel } from '../interfaces/user-model';
import { MessageService } from '../services/messages-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  constructor(private auth: AuthService,private messageService: MessageService,private router: Router){}


  form = new FormGroup({
    name: new FormControl<string | null>(null,Validators.required),
    lastName: new FormControl<string | null>(null,Validators.required),
    email: new FormControl<string | null>(null,Validators.required),
    phoneNumber: new FormControl<string | null>(null,Validators.required),
    gender: new FormControl<Gender | null>(null,Validators.required),
    address: new FormControl<string | null>(null,Validators.required),
    birthday: new FormControl<Date | null>(null,Validators.required),
  });

  genders = Gender;

  ngOnInit(){
    this.auth.getCurrenUserData()
    .pipe(take(1)).subscribe(x=>{
      this.updateForm(x);
    })
  }

  private updateForm(model: UserModel){
     this.form.patchValue({
       name: model?.name,
       lastName: model?.lastName,
       email: model?.email,
       phoneNumber: model?.phoneNumber,
       gender: model?.gender,
       birthday: model?.birthday,
       address: model?.address
     })
  }

  protected updateData(){
    this.auth.updateUserData(this.form.getRawValue() as UserModel)
    .subscribe(x=> {
    this.messageService.openSucess('user is updated successfully');
    this.router.navigate(["/products"]);
    })
  }



}
