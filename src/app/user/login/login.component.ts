import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  loginError = false;

  testEmail = ['rtoche@uark.edu'];
  testPassword = ['legomyego'];

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  login(userEmail: string, userPassword: string): void {
    console.log(userEmail);
    console.log(userPassword);

    // Once registration form is complete, similar method is used there except with createUserWithEmailAndPassword (something like that)
    this.auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        // ANDREW - Adding behavior to user authentication
        // generally we could either have a pop up for this information
        console.log('Logged in successfully');
        // or, redirect to home page, or do both (pop up then redirect after exiting popup)
      })
      .catch((error) => {
        // RAFA - Handling validation
        // in this case, just send the error message case to validation and use a series of switch statements
        // the types of error message cases should be listed on the firebase auth documentation
        console.error(error);
        this.loginError = true;
      });
  }


}
