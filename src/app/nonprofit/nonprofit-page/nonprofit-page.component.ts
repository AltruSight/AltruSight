import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Nonprofit, NonprofitsService, Rating } from 'src/app/misc-services/nonprofits.service';
import { concatMap, map, switchMap } from 'rxjs/operators';
import {Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nonprofit-page',
  templateUrl: './nonprofit-page.component.html',
  styleUrls: ['./nonprofit-page.component.scss']
})
export class NonprofitPageComponent implements OnInit {
  nonprofit?: Nonprofit;
  nonprofitRating?: Rating;
  similarNonprofits?: Nonprofit[];
  userID: any;
  nonprofitEIN = "";

  nonprofitFavorited = false;
  nonprofitUserRating?: number;
  sidenavOpened = false;

  constructor(private route: ActivatedRoute,
              private nonprofitService: NonprofitsService,
              public dialog: MatDialog,
              private router: Router,
              private firestoreDB: AngularFirestore,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      concatMap((param) => {
        // Setting company EIN
        const ein = param['nonprofit-id'];
        this.nonprofitEIN = (param['nonprofit-id']).toString();

        // TODO: fix this nested subscribe within concatMap, for now it can stay
        // getting firebase user information
        this.authService.getUserId().then((userID) => {
          this.userID = userID;
          this.firestoreDB.collection('users').doc(`${userID}`).get()
          .subscribe((snapshot: any) => {
            const data = snapshot.data();

            // getting undefined, or rating based on ein (if a user has rated the nonprofit before)
            this.nonprofitUserRating = data.ratings[ein];

            // getting array of favorites
            const favorites: string[] = data.favorites;
            // check if the nonprofit is in list of favorites in DB
            if (favorites.includes(ein)){
              this.nonprofitFavorited = true;
            } else {
              this.nonprofitFavorited = false;
            }
          });
        });
        return this.nonprofitService.getNonprofit(ein).pipe(
          map(nonprofit => [ein, nonprofit])
        );
      }),
      concatMap(([ein, nonprofit]) => {
        this.nonprofit = nonprofit;
        const ratingID = nonprofit.currentRating?.ratingID ? nonprofit.currentRating.ratingID : -1;
        return this.nonprofitService.getRatingForNonprofit(ein, ratingID).pipe((
          map(nonprofitRating => [nonprofitRating, nonprofit])
        ));
      }),
      concatMap(([nonprofitRating, nonprofit]) => {
        this.nonprofitRating = nonprofitRating;
        const causeID = nonprofit.cause.causeID ? nonprofit.cause.causeID : 0;
        return this.nonprofitService.getSimilarNonprofits(causeID);
      }),
    ).subscribe((response) => {
      this.similarNonprofits = response;
    });
  }

  getSimilarNonprofits(): Nonprofit[] {
    const randomNumbers: number[] = [];
    const similarNonprofits = this.similarNonprofits ? this.similarNonprofits : [];

    return similarNonprofits.slice(0, 4);

    /*
    while (randomNumbers.length < 4 && similarNonprofits.length !== 0) {
      const randomNumber = Math.floor(Math.random() * similarNonprofits.length) + 1;
      if (randomNumbers.indexOf(randomNumber) === -1) {
        randomNumbers.push(randomNumber);
      }
    }

    randomNumbers.push(similarNonprofits.length - 47);

    return similarNonprofits.filter((nonprofit, index) => {
      return randomNumbers.indexOf(index) !== -1;
    });
    */
  }

  getNonprofitFavorited(): boolean {
    return this.nonprofitFavorited;
  }

  // Remember that -1 means an UNRATED (by the user) organization
  getUserNonprofitRating(): number {
    return this.nonprofitUserRating || -1;
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

  // From https://charity.3scale.net/docs/data-api/reference:
  // The percent of its total expenses a charity spends on the programs and services it exists to deliver
  getNonprofitSpendingEfficiency(): any {
    return this.nonprofitRating?.financialRating?.performanceMetrics?.programExpensesRatio || 'N/A';
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
        nonprofitEIN: this.nonprofitEIN,
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
    if (this.authService.isLoggedIn) {
      const ein = this.nonprofit?.ein;

      if (this.nonprofitFavorited) {
        this.firestoreDB.collection('users').doc(this.userID).set({
          favorites: firebase.firestore.FieldValue.arrayRemove(ein),
        }, {merge: true}).then(() => {
          this.nonprofitFavorited = !this.nonprofitFavorited;
        });
      } else {
        this.firestoreDB.collection('users').doc(this.userID).set({
          favorites: firebase.firestore.FieldValue.arrayUnion(ein),
        }, {merge: true}).then(() => {
          this.nonprofitFavorited = !this.nonprofitFavorited;
        });
      }
    } else {
      // TODO: Open toast notification / dialog
      console.log('Must be logged in!');
    }
  }

  toggleSidenavOpened(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  userNonprofitRatingChanged(rating: number): void {
    console.log('userNonprofitRatingChanged(): ' + rating);

    if (this.authService.isLoggedIn && this.nonprofit) {
      const ein = this.nonprofit.ein;

      // update or write rating to firebase
      this.firestoreDB.collection('users').doc(this.userID).set({
        ratings: {
          [ein]: rating
        }
      }, {merge: true}).then(() => {
        console.log('Rating Updated');
      });
    } else {
      console.log('Must log in to rate a nonprofit!');
    }
  }

  goToNonprofitPage(ein: string): void {
    this.router.navigateByUrl(`nonprofit/${ein}`);

    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if ( pos > 0 ) {
          window.scrollTo( 0, pos - 20 ); // how far to scroll on each step
      } else {
          window.clearInterval( scrollToTop );
      }
    }, 16);
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
  nonprofitEIN: string;

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialog,
    private firestoreDB: AngularFirestore,
    private authService: AuthService) {      
    // Setting Org name
    this.organizationName = data.nonprofitName;

    // Setting org EIN
    this.nonprofitEIN = data.nonprofitEIN;

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
    // table name
    const table = 'Donations';

    const usersDonation = {
      orgName: this.getOrgName(),
      orgEIN: this.getNonProfitEIN(),
      donationDate: new Date(),
      donationAmount: this.getDonationAmount(),
      cardHolderName: this.getCardHolderName(),
      cardHolderStreet: this.getStreetAddress(),
      cardHolderState: this.getState(),
      cardHolderEmail: this.getEmail()
    };

    // Get the user's ID
    this.authService.getUserId().then((userUID) => {

      // Get user's past donations
      this.firestoreDB.collection(table).doc(userUID).get()
      .subscribe((snapshot: any) => {

        // Check to see if user exists on table, if user does not exist
        // then user has never made donations.
        if(snapshot.data() != undefined)
        {
          const data = snapshot.data();

          var userPastDonations:any[] = data.donations;
          userPastDonations.push(usersDonation);
        
          // // Add donation to the "Donations" table
          this.firestoreDB.collection(table).doc(userUID).set({
            donations: userPastDonations
          })
          .then(() => {
            // Clearing variables after successfully saving data
            this.confDonationAmount = '';
            this.confCardHolderName = '';
            this.confStreetAddress = '';
            this.confCity = '';
            this.confState = '';
            this.confCardNumber = '';
            this.confExpDate = '';
            this.confCardCVC = '';
            this.confEmailAddress = '';

            // Close dialog
            this.dialogRef.closeAll();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        }
        else
        {
          // // Add donation to the "Donations" table
          this.firestoreDB.collection(table).doc(userUID).set({
            donations: [usersDonation]
          })
          .then(() => {
            // Clearing variables after successfully saving data
            this.confDonationAmount = '';
            this.confCardHolderName = '';
            this.confStreetAddress = '';
            this.confCity = '';
            this.confState = '';
            this.confCardNumber = '';
            this.confExpDate = '';
            this.confCardCVC = '';
            this.confEmailAddress = '';

            // Close dialog
            this.dialogRef.closeAll();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
        }
        
      });
    });
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

  getNonProfitEIN(): string {
    return this.nonprofitEIN;
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
