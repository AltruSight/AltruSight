import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseOrganizationsUrl, baseOrganizationUrl, searchOrganizationsUrl} from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})

export class NonprofitsService {
  organizationsBaseURL = `${baseOrganizationsUrl}`;
  organizationBaseURL = `${baseOrganizationUrl}`;
  searchOrgUrl = `${searchOrganizationsUrl}`;

  constructor(private httpClient: HttpClient) {
  }

  searchNonprofitsByName(searchparam: string): Observable<Nonprofit[]>
  {
    const searchOrgUrl = this.searchOrgUrl + searchparam;
    return this.httpClient.get<Nonprofit[]>(searchOrgUrl);
  }

  // TODO: Add params to this method
  getNonprofits(): Observable<Nonprofit[]> {
    const organizationsURL = this.organizationsBaseURL;
    console.log(organizationsURL);
    return this.httpClient.get<Nonprofit[]>(organizationsURL);
  }

  getNonprofit(ein: string): Observable<Nonprofit> {
    const organizationURL = this.organizationBaseURL + ein;
    console.log(organizationURL);
    return this.httpClient.get<Nonprofit>(organizationURL);
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
