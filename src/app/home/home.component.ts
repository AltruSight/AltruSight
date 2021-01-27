// ng generate component home was used to create boilerplate

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidenavOpened = true;

  constructor() { }

  ngOnInit(): void {
  }

  getSidenavButtonText(): string {
    return this.sidenavOpened ? '>' : '<';
  }

  toggleSideNavOpened(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
