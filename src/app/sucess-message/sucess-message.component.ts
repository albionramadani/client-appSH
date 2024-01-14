import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-sucess-message',
  templateUrl: './sucess-message.component.html',
  styleUrls: ['./sucess-message.component.css']
})
export class SucessMessageComponent {
constructor(private matSnackBarRef: MatSnackBarRef<ErrorMessageComponent>,
  @Inject(MAT_SNACK_BAR_DATA) public message:string){}

dismiss(){
  this.matSnackBarRef.dismiss();
}
}
