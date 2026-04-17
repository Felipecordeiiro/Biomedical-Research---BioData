import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/page/about/about.component';
import { HomeComponent } from './components/page/home/home.component';
import { UploadsComponent } from './components/page/uploads/uploads.component';
import { LoginComponent } from './components/login/login.component';
import { ScreenLoginOrSignupComponent } from './components/page/screen-login-or-signup/screen-login-or-signup.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MLComponent } from './components/page/ml/ml.component';

const routes: Routes = [
  {path: '', component: ScreenLoginOrSignupComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'uploads', component: UploadsComponent},
  {path: 'ml', component: MLComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
