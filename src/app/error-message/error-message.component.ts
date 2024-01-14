import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  constructor(private matSnackBarRef: MatSnackBarRef<ErrorMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public message:string){}

  dismiss(){
    this.matSnackBarRef.dismiss();
  }
}
