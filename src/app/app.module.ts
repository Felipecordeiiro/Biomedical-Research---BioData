import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/page/about/about.component';
import { HomeComponent } from './components/page/home/home.component';
import { UploadsComponent } from './components/page/uploads/uploads.component';
import { FormsComponent } from './components/forms/forms.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ScreenLoginOrSignupComponent } from './components/page/screen-login-or-signup/screen-login-or-signup.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    UploadsComponent,
    FormsComponent,
    LoginComponent,
    SignUpComponent,
    ScreenLoginOrSignupComponent,
  ],
  imports: [BrowserModule, 
    AppRoutingModule, 
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
