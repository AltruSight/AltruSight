import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Nonprofit, NonprofitsService, Rating } from 'src/app/misc-services/nonprofits.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-nonprofit-page',
  templateUrl: './nonprofit-page.component.html',
  styleUrls: ['./nonprofit-page.component.scss']
})
export class NonprofitPageComponent implements OnInit {
  nonprofit?: Nonprofit;
  nonprofitRating?: Rating;
  nonprofitFavorited = false;
  sidenavOpened = false;

  constructor(private route: ActivatedRoute, private nonprofitService: NonprofitsService) {

  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((param) => {
        const ein = param['nonprofit-id'];
        return this.nonprofitService.getNonprofit(ein).pipe(
          switchMap((response) => {
            this.nonprofit = response;
            const ratingID = response.currentRating?.ratingID ? response.currentRating.ratingID : -1;
            return this.nonprofitService.getRatingForNonprofit(ein, ratingID);
          })
        );
      })
    ).subscribe((response) => {
      this.nonprofitRating = response;
    });
  }

  // TODO: fetch from database
  getNonprofitFavorited(): boolean {
    return this.nonprofitFavorited;
  }

  getUserNonprofitRating(): number {
    return 0;
  }

  // TODO: package these getters into a single object later
  calculateNonprofitRating(): string {
    // use "score" field - out of 100.
    // score / 100 = x / 5
    // x = score / 100 * 5 (out of 5 stars)
    if (this.nonprofitRating) {
      const rating = this.nonprofitRating.score;
      const ratingOutOf5 = (rating / 100 * 5).toFixed(1);
      return ratingOutOf5;
    }
    return 'N/A';
  }

  getNonprofitSpendingEfficiency(): number {
    return 0.71;
  }

  // Change to actual object once starting to pull from API
  getNonprofitTopCompensation(): any {
    return { name: 'George Costanza', compensation: 166001.34 };
  }

  goToNonprofitHomePageExternal(): void {
    // TODO: replace with making a modal appear with yes or no, and then modal
    // will navigate to home page based on yes / no
    console.log(`navigating to ${this.nonprofit?.websiteURL}`);
    window.open(`${this.nonprofit?.websiteURL}`, '_blank');
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
