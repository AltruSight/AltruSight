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
  nonprofitOrganizations: Nonprofit[] = [];
  userID: any;

  constructor(private nonprofitService: NonprofitsService, private router: Router, private firestoreDB: AngularFirestore, private authService: AuthService) {
    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;
    this.pageSize = 10;

    //this.nonprofitService.getNonprofits().subscribe((response) => {
    //  this.nonprofitOrganizations = response;
    //});
    this.authService.getUserId().then((userID) => {
      this.firestoreDB.collection('users').doc('favorites').get().subscribe((snapshot: any) => {
        const data = snapshot.data();
        console.log(data);
      })
    });
  }

  getNonprofits(pageEvent: PageEvent): Nonprofit[] {
    this.paginatorLength = this.nonprofitOrganizations.length;
    // page has been triggered, get the index
    if (pageEvent) {
      const pageIndex = pageEvent.pageIndex;
      const firstPosition = pageIndex * this.pageSize;
      const lastPosition = this.pageSize + pageIndex * this.pageSize;
      // TODO: perform pagination via backend (server-side)
      // so that app doesn't have to load in entire list of nonprofits each time
      return this.nonprofitOrganizations.slice(firstPosition, lastPosition);
    } else {
      return this.nonprofitOrganizations.slice(0, this.pageSize);
    }
  }

  navigateToNonprofit(nonprofitId: string): void {
    this.router.navigateByUrl(`nonprofit/${nonprofitId}`);
  }

  ngOnInit(): void {
  }

}
