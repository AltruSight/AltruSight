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

  searchInput = new FormControl();
  filteredNonProfits: Observable<string[]>;


  // TODO: issue with auth --> auth service is not instantiated until AFTER app component is
  // so we will always have auth issues on first render until fixing this
  // https://stackoverflow.com/questions/35191617/how-to-run-a-service-when-the-app-starts-in-angular-2
  constructor(public router: Router, public authService: AuthService, private nonProfitsService: NonprofitsService) {
      this.sidebarOpened = this.authService.isLoggedIn;
      this.nonProfitsService.getNonprofit('')

      // Initialize array that will hold nonprofit names
      this.initializeNonProfitsNamesArr();
      this.filteredNonProfits = this.searchInput.valueChanges.pipe(
        // startWith(''),
        map(value => this._filter(value))
      );
  }

  //========================================================
  // Helper function to filer nonprofits as user types
  //========================================================
  private _filter(value: string): string[] {
    if(value.length != 0) {
      const filterValue = value.toLowerCase();
      return this.allNonProfitsNames.filter(option => option.toLowerCase().indexOf(filterValue) >= 0);    
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
      console.log(response);
  
      for(var val of response) {
        this.allNonProfitsNames.push(val.charityName);
        // console.log(val.charityName);
      }
    });
  }

  toggleSidebarOpened(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  searchNonProfits(nonprofit: string): void
  {
    // Only search if input is not empty
    if(0 < nonprofit.length )
    {
      console.log("Searching for: " + nonprofit);
      
      // const IchHabeEinenTraum_EIN = '133355315'
      // this.nonProfitsService.getNonprofit(IchHabeEinenTraum_EIN).subscribe((response) => {
      //   console.log("Response for http request");
      //   console.log(response);
      //   //this.nonprofit = response;
      // });
    }
  }

  // TODO: Move these methods to user-info service
  getProfilePictureURL(): string {
    return '../../assets/profile-placeholder.png';
  }

  getUsername(): string { return this.authService.username; }

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

  getFriendsUsernames(): string[] {
    return [
      'Andrew',
      'Thomas',
      'Doug',
      'Kanye'
    ];
  }

  getFriendProfilePictureURL(friend: string): string {
    return '../../assets/profile-placeholder.png';
  }

  getProgress(): number {
    return 35;
  }

  getGoal(): number {
    return 76;
  }

  getProgressPercentage(): number {
    return this.getProgress() / this.getGoal() * 100;
  }

  navigateTo(page: string): void {
    this.router.navigateByUrl(`${page}`);
    this.sidebarOpened = false;
  }

  navigateToNonprofit(nonprofitId: string): void {
    this.router.navigateByUrl(`nonprofit/${nonprofitId}`);
    this.sidebarOpened = false;
  }
}
