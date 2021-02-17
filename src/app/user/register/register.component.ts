import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  registerError = false;
  errorMessage = '';
  testvar = false;

  registerForm: FormGroup;
  userEmailControl: FormControl;

  userPasswordsGroup: FormGroup;
  userPasswordControl: FormControl;
  userPasswordConfirmControl: FormControl;

  confirmPasswordsMatch = new ConfirmPasswordsMatch();

  constructor(public auth: AngularFireAuth, public router: Router) {
    this.testvar = false;

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
    { validators: this.passwordsValid.bind(this) });

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
    this.errorMessage = '';
    const password1 = control.get('userPasswordControl')?.value;
    const password2 = control.get('userPasswordConfirmControl')?.value
    
    if(password1.indexOf(' ') >= 0) {
      this.errorMessage = ErrorMessages.passwordsHasSpaces;
      // this.errorMessage = 'Passowrd may not have spaces';
      return {'passwordsInvalid:': true};
    }

    // Uncomment this when we're ready to test for 8 or more charachters,
    // with at least one letter, number and symbol.
    // else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password1)){
    //   this.errorMessage = ErrorMessages.passwordDoesNotMeetRegEx;
    //   return { 'passwordsInvalid': true };
    // }

    // console.log(control.get('userPasswordControl'))
    else if ((password1 !== password2)) {
      this.errorMessage = ErrorMessages.passwordsMustMatch;
      return { 'passwordsInvalid': true };
    }
    return null;
  }

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

export const ErrorMessages: { [key: string]: string } = {
  passwordsHasSpaces: 'Passwords may not have spaces',
  passwordsMustMatch: 'Passwords must match',
  passwordDoesNotMeetRegEx: 'Password must use 8 characters or more with at least one letter, number & symbol'
};
