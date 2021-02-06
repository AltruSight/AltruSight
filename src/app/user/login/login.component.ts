import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  loginError = false;
  errorMessage = "test";

  testEmail = ["rtoche@uark.edu"]
  testPassword = ["legomyego"]

  signInForm: FormGroup;
  userEmailControl: FormControl;


  matcher = new SignInStateMatcher();

  constructor() { 
    // Defining sign in form controls
    this.userEmailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.userEmailControl.setErrors({customEmailError: false });

    // Defining sign in form
    this.signInForm = new FormGroup({
      userEmailControl: this.userEmailControl
    });
    
  }

  emailValidator(control: AbstractControl): {[key: string]: boolean} | null {
    return null;
  }


  ngOnInit(): void {
  }

  formSubmitted(): void {

    this.signInForm.controls.userEmailControl.setErrors({customEmailError: true})
    console.log("FORM SUBMITTED");
  }

  signIn(userEmail: string, userPassword: string):void {
    
  }
}


//==============================================
// ErrorStateMatcher Implementation
//==============================================
export class SignInStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}