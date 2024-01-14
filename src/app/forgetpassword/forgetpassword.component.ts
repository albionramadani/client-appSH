import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/messages-service';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { ForgetModel } from '../interfaces/forget-model';

@Component({
  selector: 'forget-password',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
email: any;
  constructor(
    private messageService: MessageService,
    private emailService: AuthService,
    private router: Router
  ) {}

  form = new FormGroup({
    email: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit() {}
 
  resetPassword() {
    const email = this.form.get('email')?.value;
    if (email) {
      const model: ForgetModel = { email };
      this.emailService.forgetpassword(model).subscribe(
        () => {
          this.messageService.openSucess('Password reset email sent successfully.');
        },
       
      );
    }
  }
}