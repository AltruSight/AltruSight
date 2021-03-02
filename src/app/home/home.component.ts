// ng generate component home was used to create boilerplate

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidenavOpened = true;
  altViewOpened = false;
  mainContentOpened = true;

  constructor() { }

  ngOnInit(): void {
  }

  getSidenavButtonText(): string {
    return this.sidenavOpened ? '>' : '<';
  }

  toggleSideNavOpened(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  getProfilePictureURL(): string {
    return '../../assets/profile-placeholder.png';
  }

  getUsername(): string { return 'Anduru'; }

  getFavoriteNonprofits(): string[] {
    return [
      'Wikipedia',
      'Charitywatch',
      'FIFA',
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

  toggleAltView(): void {
    this.altViewOpened = !this.altViewOpened;
    this.mainContentOpened = !this.mainContentOpened;
  }

  toggleMainContent(): void {
    this.mainContentOpened = !this.mainContentOpened;
    this.altViewOpened = !this.altViewOpened;
  }
}
