import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatNativeDateModule,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SucessMessageComponent } from './sucess-message/sucess-message.component';
import { AddProductDialogComponent } from './add-products-dialog/add-products-dialog.component';
import { ProductsPageComponent } from './products/products.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { JwtInterceptor } from './interceptors/auth-interceptor';


const angularSharedModules = [
    MatSnackBarModule, // Required by MessageService
    MatButtonModule, // Required by MessageComponents
    MatMenuModule, // Required by language selector
    MatIconModule, // Required by language selector
    MatTooltipModule, // Required by language selector
    MatToolbarModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatInputModule, // Required by share-dialog
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatChipsModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatRippleModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatProgressBarModule

  ];

@NgModule({
    declarations:[
      AppComponent,
      RegisterComponent,
      LoginComponent,
      RegisterComponent,
      LoginComponent,
      ErrorMessageComponent,
      SucessMessageComponent,
      AddProductDialogComponent,
      ProductsPageComponent,
      DialogConfirmComponent,
      ForgetpasswordComponent,
      MyProfileComponent
   ],
    imports: [
      BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        angularSharedModules
    ],
    exports:[angularSharedModules],
    providers:[
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap:[AppComponent]
})

export class AppModule{}
