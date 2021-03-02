// ng generate component home was used to create boilerplate

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // TODO: Add donation time
  donations: Donation[] = [
    {id: 0, donorName: 'Jules Winnfield', donationDescription: 'Le Big Mac',
     donationCharityName: 'The Ronald McDonald House'},
    {id: 1, donorName: 'Tai Lopez', donationDescription: 'You know what I like more than materialistic things? Knowledge.',
     donationCharityName: 'Wikipedia'},
    {id: 2, donorName: 'Leo Messi', donationDescription: 'GOAT donating a goat',
     donationCharityName: 'Heifer International'},
    {id: 3, donorName: 'Vincent Vega', donationDescription: 'Check them out!',
     donationCharityName: 'The Hero Foundation'},
    {id: 4, donorName: 'Buckethead', donationDescription: 'This nonprofit is shredding...',
     donationCharityName: 'Guitar Heroes Inc.' },
    {id: 5, donorName: 'Barney Stinson', donationDescription: 'Great plays in this playbook',
     donationCharityName: 'Playbooks for Free' },
    {id: 6, donorName: 'Selena Gomez', donationDescription: 'Expecto Patronum!',
     donationCharityName: 'Novice Spells Database' },
    {id: 7, donorName: 'Geralt of Rivia', donationDescription: 'A coin for your witcher',
     donationCharityName: 'Lambert Facial Reconstruction Fund' },
  ];

  constructor(public router: Router) { }

  ngOnInit(): void {
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

  getDonations(): Donation[] {
    return this.donations;
  }
}

export class Donation {
  constructor(
    public id: number,
    public donorName: string,
    public donationDescription: string,
    public donationCharityName: string
  ){}
}
