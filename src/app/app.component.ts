import { ThisReceiver } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Nonprofit, NonprofitsService } from './misc-services/nonprofits.service';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'altrusight';
  sidebarOpened: boolean;
  allNonProfitsNames: string[] = [];

  // searchInput = new FormControl();
  // filteredNonProfits: Observable<string[]>;


  // TODO: issue with auth --> auth service is not instantiated until AFTER app component is
  // so we will always have auth issues on first render until fixing this
  // https://stackoverflow.com/questions/35191617/how-to-run-a-service-when-the-app-starts-in-angular-2
  constructor(public router: Router, public authService: AuthService, private nonProfitsService: NonprofitsService) {
      this.sidebarOpened = this.authService.isLoggedIn;
      this.nonProfitsService.getNonprofit('')

      // KEEP CODE BELOW: In case we want to improve search functinality
      // as a drop down -->
      // Initialize array that will hold nonprofit names
      // this.initializeNonProfitsNamesArr();
      // this.filteredNonProfits = this.searchInput.valueChanges.pipe(
      //   // startWith(''),
      //   map(value => this._filter(value))
      // );
  }

  //========================================================
  // Helper function to filer nonprofits as user types. 
  // This function wil trigger on user input
  //========================================================
  private _filter(searchParam: string): string[] {
    if(searchParam.length != 0) {

      const filterValue = searchParam.toLowerCase();
      return this.allNonProfitsNames.filter(possibleResult => possibleResult.toLowerCase().indexOf(filterValue) >= 0);    
    }

    return [];
  }

  //========================================================
  // Will populate nonprofits names array with results of API
  // call.
  // TODO: API call returns only 100 nonprofits (in alphabetical order).
  // Need to find a way to make this better. 
  //========================================================
  private initializeNonProfitsNamesArr(): void {

    this.nonProfitsService.getNonprofits().subscribe((response) => {
      for(var val of response) {
        this.allNonProfitsNames.push(val.charityName);
      }
    });
  }

  //========================================================
  // Toggle side bar
  //========================================================
  toggleSidebarOpened(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  //========================================================
  // Will redirect web app to non-profits search page with 
  // search parameter to display resutls
  //========================================================
  searchNonProfits(searchParam: string): void
  {
    // Only search if input is not empty
    if(0 < searchParam.length )
    {      
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([`nonprofits/${searchParam}`]));
    }
  }

  //========================================================
  // Get prfile pic from assets for now
  //========================================================
  // TODO: Move these methods to user-info service
  getProfilePictureURL(): string {
    return '../../assets/profile-placeholder.png';
  }

  //========================================================
  // Get user name
  //========================================================
  getUsername(): string { return this.authService.username; }

  //========================================================
  // Get favorite nonprofits
  //======================================================== 
  getFavoriteNonprofits(): string[] {
    return [
      'Wikipedia',
      'Charitywatch',
      'FIFA',
      'Super Long Charity Name, It Is Super Long Bro',
      'St. Jude',
      'Salvation Army',
    ];
  }

  //========================================================
  // Get friends' usernames
  //========================================================
  getFriendsUsernames(): string[] {
    return [
      'Andrew',
      'Thomas',
      'Doug',
      'Kanye'
    ];
  }

  //========================================================
  // Get friends' profile pictures
  //========================================================
  getFriendProfilePictureURL(friend: string): string {
    return '../../assets/profile-placeholder.png';
  }

  //========================================================
  // Get progress?
  //========================================================
  getProgress(): number {
    return 35;
  }

  //========================================================
  // Get goal
  //========================================================
  getGoal(): number {
    return 76;
  }

  //========================================================
  // Get percentage
  //========================================================
  getProgressPercentage(): number {
    return this.getProgress() / this.getGoal() * 100;
  }

  //========================================================
  // Navigate to page router
  //========================================================
  navigateTo(page: string): void {
    this.router.navigateByUrl(`${page}`);
    this.sidebarOpened = false;
  }

  //========================================================
  // Navigate to nonprofit page router
  //========================================================
  navigateToNonprofit(nonprofitId: string): void {
    this.router.navigateByUrl(`nonprofit/${nonprofitId}`);
    this.sidebarOpened = false;
  }
}
