import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductsPageComponent } from './products/products.component';
import { AuthGuard, NotAuthGuard } from './guards/auth-guard';
import { MyProfileComponent } from './my-profile/my-profile.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate: [NotAuthGuard]
      },
      {
        path:'products',
        component:ProductsPageComponent,
        data:{asWishlist:false},
        canActivate:[AuthGuard]
      },
      {
        path:'wishlist',
        component:ProductsPageComponent,
        data:{asWishlist:true},
        canActivate:[AuthGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotAuthGuard]
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
