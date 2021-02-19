import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  registerError = false;

  constructor(public auth: AngularFireAuth, public router: Router, private messagesService: MessagesService) { }

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
        this.router.navigateByUrl('/').then((navigated: boolean) => {
          if (navigated) {
            this.messagesService.openSnackBar('Account registered successfully!', 'Close', 50000);
          }
        });
      })
      .catch((error) => {
        // Use error in validation
        console.error(error);
      });
    }

    this.registerError = true;
  }


}

