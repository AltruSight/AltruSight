// TODO: This is the view shown when a user wants to navigate to his / her profile page
// Will be the overarching page for the account stats, friends, etc...showing a preview of each (potentially)

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  username: string;

  constructor(public authService: AuthService) {
    this.username = this.authService.username;
  }

  ngOnInit(): void {
  }

  donations: Donation[] = [
    {id: 0, donationDescription: 'Lemme get about tree fiddy', 
    donationCharityName: 'The Loch Ness Monsta', donationAmount: 3.50.toFixed(2),
    donationDate: new Date(2021, 2, 30, 12, 30, 0, 0).toLocaleString()},
    {id: 1, donationDescription: 'dollah dollah make me hollah', 
    donationCharityName: 'Red cross', donationAmount: 4.00.toFixed(2),
    donationDate: new Date(2021, 2, 28, 14, 45, 20, 0).toLocaleString()},
    {id: 2, donationDescription: 'AOT season 4 slaps', 
    donationCharityName: 'Eren Jaeger', donationAmount: 0.62.toFixed(2),
    donationDate: new Date(2021, 1, 26, 8, 15, 12, 0).toLocaleString()}
  ];
  
  getDonations(): Donation[] {
    return this.donations;
  }
}

//TODO: find a different way to represent date and amount
//Could have displayDate and displayDonationAmount that are strings
//while the actual amount is also displayed
export class Donation {
  constructor(
    public id: number,
    public donationDescription: string,
    public donationCharityName: string,
    public donationAmount: string,
    public donationDate: string
  ){}
}