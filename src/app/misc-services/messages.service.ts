import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(public snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action: string, duration?: number): void {
    this.snackBar.open(message, action, { duration });
  }
}
