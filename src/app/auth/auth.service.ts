import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MessagesService } from '../misc-services/messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  username = 'Default Profile Name';

  // TODO: Make sidebar pop up immediately upon logging in
  // My theory is that it's not being rerendered until a click
  // Utilize some lifecycle method
  constructor(private auth: AngularFireAuth, private messagesService: MessagesService, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('signed in');
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  async getUserId(): Promise<string | undefined> {
    const user = await this.auth.authState.pipe(first()).toPromise();
    return user?.uid;
  }

  // returns error message (or blank error message)
  register(userEmail: string, userPassword: string): Promise<string> {
    return this.auth.createUserWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
      this.router.navigateByUrl('/').then((navigated: boolean) => {
        if (navigated) {
          this.messagesService.openSnackBar('Account registered successfully!', 'Close', 5000);
        }
      });
      return '';
    })
    .catch((error) => {
      console.error(error);
      return error.message;
    });
  }

  // returns an error message (or blank error message)
  signIn(userEmail: string, userPassword: string): Promise<string> {
    return this.auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        // Successfully signed in
        console.log('Signed in!');

        this.router.navigateByUrl('/').then((navigated: boolean) => {
          if (navigated) {
            this.messagesService.openSnackBar('Logged in successfully!', 'Close', 5000);
          }
        });
        return '';
      })
      .catch((error) => {
        // Could not sign in
        console.log('Signed out!');
        console.log(error);
        return error.message;
      });
  }

  logout(): Promise<string> {
    return this.auth.signOut().then(() => {
      this.router.navigateByUrl('/').then((navigated: boolean) => {
        if (navigated) {
          this.messagesService.openSnackBar('Logged out successfully.', 'Close', 5000);
        }
      });
      return '';
    })
    .catch((error) => {
      console.error(error);
      return error.message;
    });
  }

}
