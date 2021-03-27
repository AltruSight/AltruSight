import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Nonprofit, NonprofitsService, Rating } from 'src/app/misc-services/nonprofits.service';
import { switchMap } from 'rxjs/operators';
import {Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { MatStep, MatStepper } from '@angular/material/stepper';

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

  constructor(private route: ActivatedRoute, private nonprofitService: NonprofitsService, public dialog: MatDialog) {

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

  openDonateDialog(): void {
    this.dialog.open(DonationDialogComponent, {
      data: {
        nonprofitName: this.nonprofit?.charityName,
        someString: 'testing string data injection!'
      },
      height: '30rem', // Height of donation dialog
      width: '50rem', // Width of donation dialog
      minWidth: '20rem',
      // Prevents user form closing dialog when clicking outside of dialog
      // Useful in cause user clicks outside on accident. They won't have to re-enter data
      disableClose: true
    });
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


// ===================================================
// Defining Component class for Dialog
// ===================================================

@Component({
  selector: './app-donation-dialog',
  templateUrl: './donation-dialog.html',
  styleUrls: ['./donation-dialog.scss']
})
export class DonationDialogComponent {
  organizationName: string;

  // Defining Step Forms
  donationAmountForm: FormGroup;
  donorInformationForm: FormGroup;
  confirmationForm: FormGroup;

  // Variables to be used in confirmation step
  confCardHolderName: string;
  confExpDate: string;
  confCardNumber: string;
  confCardCVC: string;
  confDonationAmount: string;
  confStreetAddress: string;
  confCity: string;
  confState: string;
  confEmailAddress: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private dialogRef: MatDialog) {
    // Setting Org name
    this.organizationName = data.nonprofitName;

    // Initializing confirmation variables
    this.confCardHolderName = '';
    this.confExpDate = '';
    this.confCardNumber = '';
    this.confCardCVC = '';
    this.confDonationAmount = '';
    this.confStreetAddress = '';
    this.confCity = '';
    this.confState = '';
    this.confEmailAddress = '';

    // Donation Amount Form
    this.donationAmountForm = this.formBuilder.group({
      donationAmount: ['', Validators.required]
    });

    // Donor Information Form
    this.donorInformationForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardExpirationDate: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardCVC: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])]
    });

    // Confirmation Form
    this.confirmationForm = this.formBuilder.group({

    });
  }

  submitDonation(): void
  {
    // Clearing variables
    this.confDonationAmount = '';
    this.confCardHolderName = '';
    this.confStreetAddress = '';
    this.confCity = '';
    this.confState = '';
    this.confCardNumber = '';
    this.confExpDate = '';
    this.confCardCVC = '';
    this.confEmailAddress = '';

    this.dialogRef.closeAll();
  }


  // The following 'get' methods are used in the
  // html file to display user information on confirmation tab
  getCardHolderName(): string {
    const cardHolderName = this.donorInformationForm.get('cardHolderName')?.value;
    this.confCardHolderName = cardHolderName;

    return cardHolderName;
  }

  getCardNumber(): string {
    const cardNumber = this.donorInformationForm.get('cardNumber')?.value;
    this.confCardNumber = cardNumber;

    return cardNumber;
  }

  getCardExpDate(): string {
    const cardExpDate = this.donorInformationForm.get('cardExpirationDate')?.value;
    this.confExpDate = cardExpDate;

    return cardExpDate;
  }

  getCardCVC(): string {
    const cardCVC = this.donorInformationForm.get('cardCVC')?.value;
    this.confCardCVC = cardCVC;

    return cardCVC;
  }

  getDonationAmount(): string {
    const donationAmount = this.donationAmountForm.get('donationAmount')?.value;
    this.confDonationAmount = donationAmount;

    return donationAmount;
  }

  getStreetAddress(): string {
    const streetAddress = this.donorInformationForm.get('streetAddress')?.value;
    this.confStreetAddress = streetAddress;
    return this.confStreetAddress;
  }

  getCity(): string {
    const city = this.donorInformationForm.get('city')?.value;
    this.confCity = city;
    return this.confCity;
  }

  getState(): string {
    const state = this.donorInformationForm.get('state')?.value;
    this.confState = state;
    return this.confState;
  }

  getEmail(): string {
    const email = this.donorInformationForm.get('emailAddress')?.value;
    this.confEmailAddress = email;
    return this.confEmailAddress;
  }

  getOrgName(): string {
    return this.organizationName;
  }

}
