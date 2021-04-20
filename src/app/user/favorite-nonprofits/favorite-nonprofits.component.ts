import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Nonprofit, NonprofitsService } from '../../misc-services/nonprofits.service';

@Component({
  selector: 'app-favorite-nonprofits',
  templateUrl: './favorite-nonprofits.component.html',
  styleUrls: ['./favorite-nonprofits.component.scss']
})
export class FavoriteNonprofitsComponent implements OnInit {
  paginatorLength = 0;
  pageSize: number;
  pageEvent: PageEvent;
  userID: any;
  favorites: any[] = [];
  favoriteValues: Favorite[] = [];
  favoriteEINs: string[] = [];

  constructor(private router: Router, private firestoreDB: AngularFirestore, public authService: AuthService) {
    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;
    this.pageSize = 10;

    if (this.authService.isLoggedIn) {
      this.authService.getUserId().then((userID) => {
        this.firestoreDB.collection('users').doc(`${userID}`).get().subscribe((snapshot: any) => {
          const favorites = snapshot.data().favorites;
          this.favorites = favorites;
          this.favoriteEINs = Object.keys(favorites);
          this.favoriteValues = Object.values(favorites);
        });
      });
    }
  }

  getFavorites(pageEvent: PageEvent): Favorite[] {
    this.paginatorLength = this.favoriteValues.length;
    // page has been triggered, get the index
    if (pageEvent) {
      const pageIndex = pageEvent.pageIndex;
      const firstPosition = pageIndex * this.pageSize;
      const lastPosition = this.pageSize + pageIndex * this.pageSize;
      // TODO: perform pagination via backend (server-side)
      // so that app doesn't have to load in entire list of nonprofits each time
      return this.favoriteValues.slice(firstPosition, lastPosition);
    } else {
      return this.favoriteValues.slice(0, this.pageSize);
    }
  }

  getFavoriteEIN(favoriteValue: Favorite): string {
    const favoriteIndex = this.favoriteValues.findIndex((favorite) => {
      return favorite === favoriteValue;
    });

    return this.favoriteEINs[favoriteIndex];
  }

  navigateToNonprofit(nonprofitId: string): void {
    this.router.navigateByUrl(`nonprofit/${nonprofitId}`);
  }

  ngOnInit(): void {
  }
}

interface Favorite {
  category: {
    categoryID: number,
    categoryName: string,
    charityNavigatorURL: string,
    image: string
  };
  cause: {
    causeID: number,
    causeName: string,
    charityNavigatorURL: string,
    image: string
  };
  name: string;
  rating: number;
}
