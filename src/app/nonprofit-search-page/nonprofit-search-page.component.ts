// TODO: This component is the view shown after a user clicks on "show all search results..."
// or something similar from the bottom of the search dropdown.

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Nonprofit, NonprofitsService } from '../misc-services/nonprofits.service';

@Component({
  selector: 'app-nonprofit-search-page',
  templateUrl: './nonprofit-search-page.component.html',
  styleUrls: ['./nonprofit-search-page.component.scss']
})
export class NonprofitSearchPageComponent implements OnInit {
  paginatorLength = 0;
  pageSize: number;
  pageEvent: PageEvent;

  constructor(private nonprofitService: NonprofitsService) {
    this.pageEvent = new PageEvent();
    this.pageEvent.pageIndex = 0;
    this.pageSize = 10;
  }

  getNonprofits(pageEvent: PageEvent): Nonprofit[] {
    this.paginatorLength = this.nonprofitService.getNonprofits().length;
    // page has been triggered, get the index
    if (pageEvent) {
      const pageIndex = pageEvent.pageIndex;
      const firstPosition = pageIndex * this.pageSize;
      const lastPosition = this.pageSize + pageIndex * this.pageSize;
      // TODO: perform pagination via backend (server-side)
      // so that app doesn't have to load in entire list of nonprofits each time
      return this.nonprofitService.getNonprofits().slice(firstPosition, lastPosition);
    } else {
      return this.nonprofitService.getNonprofits().slice(0, this.pageSize);
    }
  }

  ngOnInit(): void {
  }

}
