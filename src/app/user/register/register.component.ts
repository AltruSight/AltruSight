import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  registerError = false;

  constructor(public auth: AngularFireAuth, public router: Router) { }

  ngOnInit(): void {
  }

  // fake validation of confirm passwords
  userPasswordIsValid(): boolean {
    return true;
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

