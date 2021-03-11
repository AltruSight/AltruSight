import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})

export class NonprofitsService {
  testFetchURL = `${baseUrl}`;
  nonprofits: Nonprofit[] = [];

  constructor(private httpClient: HttpClient) {
    console.log(this.testFetchURL);

    this.httpClient.get<Nonprofit[]>(this.testFetchURL).subscribe((response) => {
      this.nonprofits = response;
      console.log(this.nonprofits);
    });
  }

  getNonprofits(): Nonprofit[] {
    return this.nonprofits;
  }
}

export interface Nonprofit {
  charityNavigatorURL: string;
  tagLine: string;
  charityName: string;
  ein: string;
  mission: string;
  websiteURL: string;
  category: {
    categoryName: string;
    categoryID: number;
  };
  cause: {
    causeName: string;
    causeID: number;
  };
  irsClassification: {
    deductibility: string;
    deductibilityCode: string;
    subsection: string;
    assetAmount: number;
    nteeType: string;
    nteeSuffix: string;
    nteeCode: string;
    nteeClassification: string;
    nteeLetter: string;
    incomeAmount: number;
    filingRequirement: string;
    classification: string;
    latest990: string;
    rulingDate: string;
    groupName: string;
    affiliation: string;
    foundationStatus: string;
    accountingPeriod: string;
    exemptOrgStatusCode: string;
    exemptOrgStatus: string;
  };
  mailingAddress: {
    country: string;
    stateOrProvince: string;
    city: string;
    postalCode: string;
    streetAddress1: string;
    streetAddress2: string;
  };
  donationAddress: {
    country: string;
    stateOrProvince: string;
    city: string;
    postalCode: string;
    streetAddress1: string;
    streetAddress2: string;
  };
  currentRating: {
    score: number;
    rating: number;
    publicationDate: string;
    ratingID: number;
  };
}
