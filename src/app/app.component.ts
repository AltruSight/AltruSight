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
  sidebarOpened: boolean;

  // TODO: issue with auth --> auth service is not instantiated until AFTER app component is
  // so we will always have auth issues on first render until fixing this
  // https://stackoverflow.com/questions/35191617/how-to-run-a-service-when-the-app-starts-in-angular-2
  constructor(public router: Router, public authService: AuthService) {
      this.sidebarOpened = this.authService.isLoggedIn;
  }

  toggleSidebarOpened(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  // TODO: Move these methods to user-info service
  getProfilePictureURL(): string {
    return '../../assets/profile-placeholder.png';
  }

  getUsername(): string { return this.authService.username; }

  getFavoriteNonprofits(): string[] {
    return [
      'Wikipedia',
      'Charitywatch',
      'FIFA',
      'Super Long Charity Name, It Is Super Long Bro',
      'St. Jude',
      'Salvation Army',
    ];
  }

  getFriendsUsernames(): string[] {
    return [
      'Andrew',
      'Thomas',
      'Doug',
      'Kanye'
    ];
  }

  getFriendProfilePictureURL(friend: string): string {
    return '../../assets/profile-placeholder.png';
  }

  getProgress(): number {
    return 35;
  }

  getGoal(): number {
    return 76;
  }

  getProgressPercentage(): number {
    return this.getProgress() / this.getGoal() * 100;
  }

  navigateTo(page: string): void {
    this.router.navigateByUrl(`${page}`);
    this.sidebarOpened = false;
  }

  navigateToNonprofit(nonprofitId: string): void {
    this.router.navigateByUrl(`nonprofit/${nonprofitId}`);
    this.sidebarOpened = false;
  }
}
