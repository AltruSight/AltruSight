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
}
