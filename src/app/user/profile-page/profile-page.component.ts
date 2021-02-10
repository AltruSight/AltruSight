// TODO: This is the view shown when a user wants to navigate to his / her profile page
// Will be the overarching page for the account stats, friends, etc...showing a preview of each (potentially)

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
