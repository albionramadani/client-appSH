import { Component } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client-app';
  constructor(protected auth: AuthService,
    private router: Router){}

protected logOut(){
  this.auth.logout();
  this.router.navigate(["/login"]);
}

protected home(){
  this.router.navigate(["../"]);
}
}
