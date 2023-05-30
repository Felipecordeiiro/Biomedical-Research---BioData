import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginModel } from 'src/app/models/LoginModels';
import { Sign_up_models } from 'src/app/models/sign_up_models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  sign_upform!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router){}

    ngOnInit(): void{
      
      this.sign_upform = this.formBuilder.group({
        senha_sign_up: ['', Validators.required],
        email_sign_up: ['', Validators.required, Validators.email],
        nome: ['', Validators.required],
        user: ['', Validators.required],
      })
  
      this.sign_upform = new FormGroup({
        email_sign_up: new FormControl('', [Validators.required]),
        senha_sign_up: new FormControl('', [Validators.required]),
        user: new FormControl('', [Validators.required]),
        nome: new FormControl('',[Validators.required]),
      })

    }

  Fazersign_up(){
    
    var dados_sign_up = this.sign_upform.getRawValue() as Sign_up_models;
    debugger
  }

  get email_sign_up(){
    return this.sign_upform.get('email_sign_up')!;
  }
  get senha_sign_up(){
    return this.sign_upform.get('senha_sign_up')!;
  }
  get nome(){
    return this.sign_upform.get('nome')!;
  }
  get user(){
    return this.sign_upform.get('user')!;
  }
}
