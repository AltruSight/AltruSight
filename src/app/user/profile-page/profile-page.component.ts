// TODO: This is the view shown when a user wants to navigate to his / her profile page
// Will be the overarching page for the account stats, friends, etc...showing a preview of each (potentially)

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Donation } from 'src/app/home/home.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(public authService: AuthService, private firestoreDB: AngularFirestore, private router: Router) {
    this.username = this.authService.username;
  }

  username: string;

  donations: Donation[] = [];

  ngOnInit(): void {
    this.authService.getUserId().then((userID) => {
      if (userID) {
        const donations = this.firestoreDB.collection('User-Donations', ref => ref.where('donorID', '==', userID))
        .get().subscribe((snapshot) => {
          snapshot.forEach(result => {
            this.donations.push(result.data() as Donation);
          });
        });
      }
    });
  }

  getDonations(): Donation[] {
    return this.donations;
  }

  getProfilePictureURL(): string {
    return '../../assets/images/profile-placeholder.png';
  }

  navigateToNonprofit(nonprofitId: string): void {
    this.router.navigateByUrl(`nonprofit/${nonprofitId}`);
  }
}
