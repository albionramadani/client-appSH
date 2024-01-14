import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { SucessMessageComponent } from "../sucess-message/sucess-message.component";

@Injectable({
  providedIn: 'root'
})
export class MessageService
{
constructor(private readonly snackbar: MatSnackBar,private readonly dialog: MatDialog){}

openError(message: string){
  return this.snackbar.openFromComponent(ErrorMessageComponent!,{
    horizontalPosition:'end',
    data:message,
    duration:100
  })
}

  openSucess(message: string){
    return this.snackbar.openFromComponent(SucessMessageComponent!,{
      horizontalPosition:'end',
      data:message,
      duration:2000
    })
  }
}
