import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'altrusight';

  constructor(public router: Router, public authService: AuthService) {}

  navigateTo(path: string): void {
    this.router.navigateByUrl(`/${path}`);
  }
}
