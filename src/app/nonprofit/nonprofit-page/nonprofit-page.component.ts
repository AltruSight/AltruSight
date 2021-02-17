import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nonprofit-page',
  templateUrl: './nonprofit-page.component.html',
  styleUrls: ['./nonprofit-page.component.scss']
})
export class NonprofitPageComponent implements OnInit {
  nonprofitName = '';
  nonprofitFavorited = false;
  sidenavOpened = true;

  constructor(private route: ActivatedRoute  ) { }

  ngOnInit(): void {
    // need to make sure this route is only accessible when id is passed in
    this.nonprofitName = this.route.snapshot.paramMap.get('nonprofit-id') as string;
  }

  getNonprofitFavorited(): boolean {
    return this.nonprofitFavorited;
  }

  // TODO: package these getters into a single object later
  getNonprofitRating(): number {
    // use "score" field - out of 100.
    // score / 100 = x / 5
    // x = score / 100 * 5 (out of 5 stars)
    return 4.4;
  }

  getNonprofitMission(): string {
    return 'this nonprofit is nonprofit to be charitable and nonprofit, duh.';
  }

  getNonprofitSpendingEfficiency(): number {
    return 0.71;
  }

  getNonprofitTopCompensation(): number {
    return 166000.3;
  }

  goToNonprofitHomePageExternal(): void {
    // replace with making a modal appear with yes or no, and then modal
    // will navigate to home page based on yes / no
    console.log('Navigating to external home page');
  }

  donationButtonClicked(): void {
    // create modal form for donations
    console.log('donation button clicked...');
  }

  toggleNonprofitFavorited(): void {
    this.nonprofitFavorited = !this.nonprofitFavorited;
  }

  toggleSidenavOpened(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
