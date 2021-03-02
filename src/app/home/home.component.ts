// ng generate component home was used to create boilerplate

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidenavOpened = false;

  constructor(public router: Router) { }

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
  }

  navigateToNonprofit(nonprofitId: string): void {
    this.router.navigateByUrl(`nonprofit/${nonprofitId}`);
  }

  public donations: donation[] = [
    {id:0, donorName: 'Jules Winnfield', donationDescription: 'Le Big Mac',
     donationCharityName: 'The Ronald McDonald House'},
    {id:1, donorName: 'Tai Lopez', donationDescription: 'You know what I like more than materialistic things? Knowledge.',
     donationCharityName: 'Wikipedia'},
    {id:2, donorName: 'Leo Messi', donationDescription: 'GOAT donating a goat',
     donationCharityName: 'Heifer International'},
    {id:3, donorName: 'Vincent Vega', donationDescription: 'Check them out!',
     donationCharityName: 'The Hero Foundation'},
  ]

  getDonations(): donation[] {
    return [
      this.donations[0],
      this.donations[1],
      this.donations[2]
    ];
  }
}

export class donation {
  constructor(
    public id: number,
    public donorName: string,
    public donationDescription: string,
    public donationCharityName: string
  ){}
}
