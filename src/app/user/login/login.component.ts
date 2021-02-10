import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hidePassword = true;
  errorMessage = '';
  showLoadingDiv = true;

  signInForm: FormGroup;
  userEmailControl: FormControl;
  userPasswordControl: FormControl;

  constructor(public auth: AngularFireAuth, public router: Router) {
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

    this.showLoadingDiv = false;
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
      this.showLoadingDiv = true;
      this.errorMessage = '';

      this.auth.signInWithEmailAndPassword(userEmail, userPassword).then((user) => {
        // Successfully signed in
        console.log('Signed in!');

        this.errorMessage = '';
        this.router.navigateByUrl('/');
        // this.showLoadingDiv = false;
      })
      .catch((error) => {
        // Could not sign in
        this.showLoadingDiv = false;
        console.log(error);
        this.errorMessage = error.message;
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
