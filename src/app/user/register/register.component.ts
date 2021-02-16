import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { formatCurrency } from '@angular/common';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  registerError = false;
  errorMessage = "";

  registerForm: FormGroup;
  userEmailControl: FormControl;

  userPasswordsGroup: FormGroup;
  userPasswordControl: FormControl;
  userPasswordConfirmControl: FormControl;

  confirmPasswordsMatch = new ConfirmPasswordsMatch();

  constructor(public auth: AngularFireAuth, public router: Router) {
    // User Email
    this.userEmailControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    // User Password
    this.userPasswordControl = new FormControl('', [
      Validators.required,
    ]);

    // User Password confirmation
    this.userPasswordConfirmControl = new FormControl('', [
      Validators.required,
    ]);

    // Passwords group
    this.userPasswordsGroup = new FormGroup({
      userPasswordControl: this.userPasswordControl,
      userPasswordConfirmControl: this.userPasswordConfirmControl
    }, 
    {validators: this.passwordsValid});

    // User registration form
    this.registerForm = new FormGroup({
      userEmailControl: this.userEmailControl,
      userPasswordsGroup: this.userPasswordsGroup
    });
    // this.registerForm.setValidators(this.passwordsValidator);
  }

  ngOnInit(): void {
  }

  // fake validation of confirm passwords
  userPasswordIsValid(): boolean {
    return true;
  }

  passwordsValid(control: AbstractControl): { [key: string]: boolean } | null {
    const password1 = control.get('userPasswordControl')?.value;
    const password2 = control.get('userPasswordConfirmControl')?.value
    
    // console.log(control.get('userPasswordControl'))
    if ((password1 !== password2)) {
        console.log('passwords dont match!!')
        return { 'passwordsInvalid': true };
    }
    return null;
  }

  // // Keep for future reference: How to create custom validator
  // // https://dzone.com/articles/how-to-create-custom-validators-in-angular
  // passwordsValidator(passwordControl: FormControl): ValidatorFn {
  //   console.log('PASSWORD VALIDATOR');
  //   console.log(passwordControl);
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
  //     if(passwordControl.value === control.value)
  //       return {'passwordsMatch': true };
  //     else 
  //       return {'passwordsMatch': false};
  //   };
  //   // return null;
  // }

  register(userEmail: string, userPassword: string, userConfirmPassword: string): void {
    if (userPassword === userConfirmPassword && this.userPasswordIsValid()) {
      // RAFA: Add validation here (if passswords don't match, throw error)
      this.auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        console.log(userEmail);
        console.log(userPassword);
        console.log(userConfirmPassword);
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        // Use error in validation
        console.error(error);
      });
    }

    this.registerError = true;
  }
}

export const errorMessages: { [key: string]: string } = {
  confirmPassword: 'Passwords must match'
};

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmPasswordsMatch implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const parentValid = control!.parent!.valid;
      const firstPasswordTyped = control!.parent!.get('userPasswordControl')!.dirty;
      
      return !parentValid && firstPasswordTyped      
  }
}
