import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseOrganizationsUrl, baseOrganizationUrl, baseRatingUrl } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})

export class NonprofitsService {
  organizationsBaseURL = `${baseOrganizationsUrl}`;
  organizationBaseURL = `${baseOrganizationUrl}`;
  ratingBaseURL = `${baseRatingUrl}`;

  constructor(private httpClient: HttpClient) {
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

  getRatingForNonprofit(ein: string, ratingID: number): Observable<Rating> {
    const ratingURL = this.ratingBaseURL + ein + `&ratingID=${ratingID}`;
    console.log(ratingURL);
    return this.httpClient.get<Rating>(ratingURL);
  }
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
    causeName: string | null;
    causeID: number | null;
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
