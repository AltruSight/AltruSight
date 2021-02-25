import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hidePassword = true;
  errorMessage = '';
  showLoadingDiv = false;

  signInForm: FormGroup;
  userEmailControl: FormControl;
  userPasswordControl: FormControl;

  constructor(public router: Router,
              public messagesService: MessagesService,
              private authService: AuthService
  ) {
    // Defining user email control
    this.userEmailControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    // this.userEmailControl.setErrors({customEmailError: false });

    // Defining password control
    this.userPasswordControl = new FormControl('', [
      Validators.required
    ]);

  // Defining sign in form
    this.signInForm = new FormGroup({
      userEmailControl: this.userEmailControl,
      userPasswordControl: this.userPasswordControl
    });
  }

  // Keep for future reference: How to create custom validator
  // https://dzone.com/articles/how-to-create-custom-validators-in-angular
  emailValidator(control: AbstractControl): {[key: string]: boolean} | null {
    console.log('EMAIL VALIDATOR');
    return null;
  }

  ngOnInit(): void {
  }

  signIn(userEmail: string, userPassword: string): void {
    // Check to make sure form is not invalid before submitting
    if (!this.signInForm.invalid) {
      this.errorMessage = '';

      this.authService.signIn(userEmail, userPassword)
        .then((errorMessage) => {
          this.errorMessage = errorMessage;
        }).catch((errorMessage) => {
          this.errorMessage = errorMessage;
        });
    }
  }
}


// ==============================================
// ErrorStateMatcher Implementation
// ==============================================
export class SignInStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
