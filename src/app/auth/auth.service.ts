import { Injectable } from '@angular/core';
import { LoginModel } from '../models/LoginModels';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Fazerlogin(loginModel: LoginModel){

    /*if(loginModel.email == 'felipecordeiro@alu.ufc.br' &&
    loginModel.senha == '12345')
      this.router.navigate(['/home']);
      */
  };

  constructor() {}
}
