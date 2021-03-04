import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nonprofit-page',
  templateUrl: './nonprofit-page2.component.html',
  styleUrls: ['./nonprofit-page2.component.scss']
})
export class NonprofitPageComponent implements OnInit {
  nonprofitName = '';
  nonprofitFavorited = false;
  sidenavOpened = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // TODO: need to make sure this route is only accessible when id is passed in
    this.nonprofitName = this.route.snapshot.paramMap.get('nonprofit-id') as string;
  }

  // TODO: fetch from database
  getNonprofitFavorited(): boolean {
    return this.nonprofitFavorited;
  }

  getUserNonprofitRating(): number {
    return 4;
  }

  // TODO: package these getters into a single object later
  getNonprofitRating(): number {
    // use "score" field - out of 100.
    // score / 100 = x / 5
    // x = score / 100 * 5 (out of 5 stars)
    return 4.4;
  }

  getNonprofitMission(): string {
    return `The mission of ${this.nonprofitName} is to serve the world
            for good, and to increase the transparency of other nonprofits.
            We want each and every person to be able to make informed
            donation decisions.`;
  }

  getNonprofitSpendingEfficiency(): number {
    return 0.71;
  }

  // Change to actual object once starting to pull from API
  getNonprofitTopCompensation(): any {
    return { name: 'George Costanza', compensation: 166001.34 };
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

  userNonprofitRatingChanged(rating: number): void {
    console.log('nonprofit rating changed to: ' + rating);
  }
}
