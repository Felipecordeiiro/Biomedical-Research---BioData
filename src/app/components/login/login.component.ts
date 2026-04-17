import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginModel } from 'src/app/models/LoginModels';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  private loginmodel: LoginModel = new LoginModel();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService){}

    ngOnInit(): void{

    this.loginForm = this.formBuilder.group({

    email: ['', Validators.required,Validators.email],
    senha: ['', Validators.required],
    } 
    )
    
    this.loginForm = new FormGroup({
    email: new FormControl(''),
    senha: new FormControl('', [Validators.required]),
    })
    
  }
  
  Fazerlogin(){
    var dadosLogin = this.loginForm.getRawValue() as LoginModel;
    console.log(dadosLogin);
    
    if(dadosLogin.email == 'felipecordeiro@alu.ufc.br' &&
    dadosLogin.senha == '12345')
      this.router.navigate(['/home']);
    else
      this.router.navigate(['']);
  }
    
  get email(){
    return this.loginForm.get('email')!;
  }
  get senha(){
    return this.loginForm.get('senha')!;
  }
}