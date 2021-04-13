import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseOrganizationsUrl, baseOrganizationUrl, baseRatingUrl, searchOrganizationsUrl} from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})

export class NonprofitsService {
  organizationsBaseURL = `${baseOrganizationsUrl}`;
  organizationBaseURL = `${baseOrganizationUrl}`;
  searchOrgUrl = `${searchOrganizationsUrl}`;
  ratingBaseURL = `${baseRatingUrl}`;

  constructor(private httpClient: HttpClient) {
  }

  searchNonprofitsByName(searchparam: string): Observable<Nonprofit[]>
  {
    const searchOrgUrl = this.searchOrgUrl + searchparam;
    console.log('searchNonprofitsByName(): ' + searchOrgUrl);
    return this.httpClient.get<Nonprofit[]>(searchOrgUrl);
  }



  // TODO: Add params to this method
  getNonprofits(params?: QueryParams): Observable<Nonprofit[]> {
    // no params provided, return all nonprofits with no filter
    const pageNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const organizationsURL = this.organizationsBaseURL;

    if (!params) {
      const url = organizationsURL + '&rated=true&sort=NAME:ASC';
      // Used to get multiple observables from looped API call
      // Then we reduce the array of observables into a single array
      // TODO: Figure out how to do this loop without hardcoded pageNums -- just iterate until response is error
      return forkJoin(
        pageNums.map(pageNum => {
          const newURL = url + `&pageNum=${pageNum}`;
          console.log('getNonprofits():' + newURL);
          return this.httpClient.get<Nonprofit[]>(newURL);
        })
      ).pipe(
        map(response => response.reduce((arr, r) => arr.concat(r), []))
      );
    // TODO: params provided, use method to return specific nonprofits based on filters
    } else {
      let url = organizationsURL;
      if (params.categoryID) { url += `&categoryID=${params.categoryID}`; }
      if (params.causeID) { url += `&causeID=${params.causeID}`; }
      if (params.cfcCharities) { url += `&cfcCharities=${params.cfcCharities}`; }
      if (params.city) { url += `&city=${params.city}`; }
      if (params.donorPrivacy) { url += `&donorPrivacy=${params.donorPrivacy}`; }
      if (params.fundraisingOrgs) { url += `&fundraisingOrgs=${params.fundraisingOrgs}`; }
      if (params.maxRating) { url += `&maxRating=${params.maxRating}`; }
      if (params.minRating) { url += `&minRating=${params.minRating}`; }
      if (params.noGovSupport) { url += `&noGovSupport=${params.noGovSupport}`; }
      if (params.pageNum) { url += `&pageNum=${params.pageNum}`; }
      if (params.pageSize) { url += `&pageSize=${params.pageSize}`; }
      if (params.rated) { url += `&rated=${params.rated}`; }
      if (params.scopeOfWork) { url += `&scopeOfWork=${params.scopeOfWork}`; }
      if (params.search) { url += `&search=${params.search}`; }
      if (params.searchType) { url += `&searchType=${params.searchType}`; }
      if (params.sizeRange) { url += `&sizeRange=${params.sizeRange}`; }
      if (params.sort) { url += `&sort=${params.sort}`; }
      if (params.state) { url += `&state=${params.state}`; }
      if (params.zip) { url += `&zip=${params.zip}`; }

      console.log('getNonprofits(params):' + url);
      return this.httpClient.get<Nonprofit[]>(url);
    }
  }

  getNonprofit(ein: string): Observable<Nonprofit> {
    const organizationURL = this.organizationBaseURL + ein;
    console.log('getNonprofit(): ' + organizationURL);
    return this.httpClient.get<Nonprofit>(organizationURL);
  }

  getRatingForNonprofit(ein: string, ratingID: number): Observable<Rating> {
    const ratingURL = this.ratingBaseURL + ein + `&ratingID=${ratingID}`;
    console.log('getRatingForNonprofit(): ' + ratingURL);
    return this.httpClient.get<Rating>(ratingURL);
  }

  getSimilarNonprofits(categoryID: number): Observable<Nonprofit[]> {
    const similarNonprofitURL = this.organizationsBaseURL + `&causeID=${categoryID}`;
    console.log('getSimilarNonprofits(): ' + similarNonprofitURL);
    return this.httpClient.get<Nonprofit[]>(similarNonprofitURL);
  }
}

export interface QueryParams {
  rated?: string;
  pageSize?: string;
  pageNum?: string;
  search?: string;
  searchType?: string;
  categoryID?: string;
  causeID?: string;
  fundraisingOrgs?: string;
  state?: string;
  city?: string;
  zip?: string;
  minRating?: string;
  maxRating?: string;
  sizeRange?: string;
  donorPrivacy?: string;
  scopeOfWork?: string;
  cfcCharities?: string;
  noGovSupport?: string;
  sort?: string;
}

export interface Nonprofit {
  charityNavigatorURL: string;
  tagLine: string | null;
  charityName: string;
  ein: string;
  orgID?: number;
  mission: string;
  websiteURL: string | null;
  phoneNumber?: string | null;
  generalEmail?: string | null;
  category?: {
    categoryName: string | null;
    categoryID: number | null;
  };
  cause?: {
    causeName: string;
    causeID: number;
  };
  irsClassification?: {
    deductibility: string | null;
    deductibilityCode: string | null;
    subsection: string | null;
    assetAmount: number | null;
    nteeType: string | null;
    nteeSuffix: string | null;
    nteeCode: string | null;
    nteeClassification: string | null;
    nteeLetter: string | null;
    incomeAmount: number | null
    filingRequirement: string | null;
    classification: string | null;
    latest990: string | null;
    rulingDate: string | null;
    groupName: string | null;
    affiliation: string | null;
    foundationStatus: string | null;
    accountingPeriod: string | null;
    exemptOrgStatusCode: string | null;
    exemptOrgStatus: string | null;
  };
  mailingAddress?: {
    country: string | null;
    stateOrProvince: string | null;
    city: string | null;
    postalCode: string | null;
    streetAddress1: string | null;
    streetAddress2: string | null;
  };
  donationAddress?: {
    country: string | null;
    stateOrProvince: string | null;
    city: string | null;
    postalCode: string | null;
    streetAddress1: string | null;
    streetAddress2: string | null;
  };
  currentRating?: {
    score: number;
    rating: number;
    publicationDate: string;
    ratingID: number;
  };
  activeAdvisories?: {
    _rapid_links: {
      related: {
        href: string | null;
      }
    }
  };
  currentBoardChair?: {
    name: string | null;
    title: string | null;
  };
  currentCEO?: {
    name: string | null;
    title: string | null;
  };
  removedAdvisories?: {
    _rapid_links: {
      related: {
        href: string | null;
      }
    }
  };
  ratingHistory?: {
    _rapid_links: {
      related: {
        href: string | null;
      }
    }
  };
}

export interface Rating {
  ratingID: number;
  includedOrganizations?: {
    rapidLinks: {
      related: {
        href: string | null;
      }
    }
  }[];
  referenceOrganization?: {
    rapidLinks: {
      related: {
        href: string | null;
      }
    }
  };
  score: number;
  rating: number;
  ratingImage?: {
    small: string | null;
    large: string | null;
  };
  form990?: {
    fundraisingExpenses: number | null;
    administrativeExpenses: number | null;
    programExpenses: number | null;
    totalExpenses: number | null;
    totalRevenue: number | null;
    totalNetAssets: number | null;
  };
  financialRating?: {
    score: number;
    rating: number;
    performanceMetrics?: {
      fundraisingEfficiency: number | null;
      fundraisingExpensesRatio: number | null;
      programExpensesGrowth: number | null;
      programExpensesRatio: number | null;
      administrationExpensesRatio: number | null;
      liabilitiesToAssetsRatio: number | null;
      workingCapitalRatio: number | null;
      primaryRevenueGrowth: number | null;
    };
  };
  accountabilityRating: {
    score: number | null;
    rating: number | null;
    accountabilityTests?: {
      boardListStatus: string | null;
      staffListStatus: string | null;
      auditedFinancialStatus: string | null;
      form990Status: string | null;
      privacyStatus: string | null;
      loansToOrFromOfficers: string | null;
      loansToOfficers: string | null;
      loansFromOfficers: string | null;
      materialDiversionOfAssets: string | null;
      boardMeetingMinutes: string | null;
      distributes990ToBoard: string | null;
      conflictOfInterestPolicy: string | null;
      whistleBlowerPolicy: string | null;
      recordsRetentionPolicy: string | null;
      reportsCEOAndSalary: string | null;
      ceoCompensationProcedure: string | null;
      compensatesBoard: string | null;
      independentAudit: string | null;
      independentBoard: string | null;
    }
  };
}
