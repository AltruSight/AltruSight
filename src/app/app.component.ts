import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Nonprofit } from './misc-services/nonprofits.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'altrusight';
  sidebarOpened: boolean;

  // TODO: issue with auth --> auth service is not instantiated until AFTER app component is
  // so we will always have auth issues on first render until fixing this
  // https://stackoverflow.com/questions/35191617/how-to-run-a-service-when-the-app-starts-in-angular-2
  constructor(public router: Router, public authService: AuthService) {
      this.sidebarOpened = this.authService.isLoggedIn;
  }

  toggleSidebarOpened(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

  // TODO: Move these methods to user-info service
  getProfilePictureURL(): string {
    return '../../assets/profile-placeholder.png';
  }

  getUsername(): string { return this.authService.username; }

  getFavoriteNonprofits(): Nonprofit[] {
    const wikimedia = {
      // tslint:disable-next-line:max-line-length
      charityNavigatorURL: 'https://www.charitynavigator.org/?bay=search.summary&orgid=11212&utm_source=DataAPI&utm_content=6bc9f3c8', currentCEO: {name: 'Katherine Maher ', title: 'Executive Director'}, tagLine: 'Imagine a world in which every single human being can freely share in the sum of all knowledge', charityName: 'Wikimedia Foundation', ein: '200049703', currentBoardChair: {name: 'María Sefidari', title: 'Chair'}, orgID: 11212, mission: 'The Wikimedia Foundation, Inc. is dedicated to encouraging the growth, development and distribution of free, multilingual content, and to providing the full content of these wiki-based projects to the public free of charge. The Foundation operates some of the largest collaboratively edited reference projects in the world, including Wikipedia, the fourth most visited website in the world. In collaboration with a network of chapters, the Foundation provides the essential infrastructure and an organizational framework for the support and development of multilingual wiki projects and other endeavors which serve this mission.', phoneNumber: '4158396885', websiteURL: 'http://wikimediafoundation.org/', generalEmail: 'donate@wikimedia.org', activeAdvisories: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/200049703/Advisories?status=ACTIVE'}}}, removedAdvisories: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/200049703/Advisories?status=REMOVED'}}}, ratingHistory: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/200049703/Ratings'}}}, category: {image: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/categories/arts.png?utm_source=DataAPI&utm_content=6bc9f3c8', charityNavigatorURL: 'https://www.charitynavigator.org/index.cfm?bay=search.categories&categoryid=2&utm_source=DataAPI&utm_content=6bc9f3c8', categoryName: 'Arts, Culture, Humanities', categoryID: 2}, cause: {causeID: 5, charityNavigatorURL: 'https://www.charitynavigator.org/index.cfm?bay=search.results&cgid=2&cuid=5&utm_source=DataAPI&utm_content=6bc9f3c8', causeName: 'Public Broadcasting and Media', image: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/causes/small/public_radio.gif?utm_source=DataAPI&utm_content=6bc9f3c8'}, irsClassification: {deductibility: 'Contributions are deductible', subsection: '501(c)(3)', assetAmount: 176019709, nteeType: 'Educational Institutions and Related Activities', nteeSuffix: null, incomeAmount: 135577430, filingRequirement: '990 (all other) or 990EZ return', classification: 'Educational Organization', latest990: 'June, 2019', rulingDate: 'March, 2005', nteeCode: 'B60', groupName: null, affiliation: 'Independent - the organization is an independent organization or an independent auxiliary (i.e., not affiliated with a National, Regional, or Geographic grouping of organizations).', deductibilityCode: '1', foundationStatus: 'Organization which receives a substantial part of its support from a governmental unit or the general public   170(b)(1)(A)(vi)', nteeClassification: 'Adult, Continuing Education', accountingPeriod: 'June', exemptOrgStatusCode: '01', exemptOrgStatus: 'Unconditional Exemption', deductibilityDetail: null, nteeLetter: 'B'}, mailingAddress: {country: null, stateOrProvince: 'CA', city: 'San Francisco', postalCode: '94104', streetAddress1: '1 Montgomery Street', streetAddress2: 'Suite 1600'}, currentRating: {score: 98.14, ratingID: 147516, publicationDate: '2019-11-01T04:00:00.000Z', ratingImage: {small: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4starsb.png', large: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4stars.png'}, rating: 4, _rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/200049703/Ratings/147516'}}}
    };

    const charitynavigator = {
      // tslint:disable-next-line:max-line-length
      charityNavigatorURL: 'https://www.charitynavigator.org/?bay=search.summary&orgid=13366&utm_source=DataAPI&utm_content=6bc9f3c8', currentCEO: {name: 'Michael Thatcher', title: 'President, CEO'}, tagLine: 'Your guide to intelligent giving', charityName: 'Charity Navigator', ein: '134148824', currentBoardChair: {name: 'Matt Giegerich', title: 'Chairman of the Board'}, orgID: 13366, mission: 'Charity Navigator works to make impactful philanthropy easier for all. Charity Navigator\'s goal is to equip the entire philanthropic ecosystem with the tools, ratings, and information they need to make impactful investments. In addition, Charity Navigator works to expand the number of people and organizations who understand and commit to the idea of intentional philanthropy. And Charity Navigator strives to deepen the community\'s commitment to giving.', phoneNumber: '2018181288', websiteURL: 'http://www.charitynavigator.org', generalEmail: 'info@charitynavigator.org', activeAdvisories: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/134148824/Advisories?status=ACTIVE'}}}, removedAdvisories: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/134148824/Advisories?status=REMOVED'}}}, ratingHistory: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/134148824/Ratings'}}}, category: {image: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/categories/research.png?utm_source=DataAPI&utm_content=6bc9f3c8', charityNavigatorURL: 'https://www.charitynavigator.org/index.cfm?bay=search.categories&categoryid=11&utm_source=DataAPI&utm_content=6bc9f3c8', categoryName: 'Research and Public Policy', categoryID: 11}, cause: {causeID: 24, charityNavigatorURL: 'https://www.charitynavigator.org/index.cfm?bay=search.results&cgid=11&cuid=24&utm_source=DataAPI&utm_content=6bc9f3c8', causeName: 'Social and Public Policy Research', image: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/causes/small/research_public_policy.gif?utm_source=DataAPI&utm_content=6bc9f3c8'}, irsClassification: {deductibility: 'Contributions are deductible', subsection: '501(c)(3)', assetAmount: 4278059, nteeType: 'Philanthropy, Voluntarism and Grantmaking Foundations', nteeSuffix: null, incomeAmount: 4925554, filingRequirement: '990 (all other) or 990EZ return', classification: 'Charitable Organization', latest990: 'June, 2020', rulingDate: 'January, 2002', nteeCode: 'T05', groupName: null, affiliation: 'Independent - the organization is an independent organization or an independent auxiliary (i.e., not affiliated with a National, Regional, or Geographic grouping of organizations).', deductibilityCode: '1', foundationStatus: 'Organization that normally receives no more than one-third of its support from gross investment income and unrelated business income and at the same time more than one-third of its support from contributions, fees, and gross receipts related to exempt purposes.  509(a)(2)', nteeClassification: 'Research Institutes and/or Public Policy Analysis ', accountingPeriod: 'June', exemptOrgStatusCode: '01', exemptOrgStatus: 'Unconditional Exemption', deductibilityDetail: null, nteeLetter: 'T'}, mailingAddress: {country: null, stateOrProvince: 'NJ', city: 'Saddle Brook', postalCode: '07663', streetAddress1: '299 Market Street', streetAddress2: 'Suite 250'}, currentRating: {score: 92.39, ratingID: 151394, publicationDate: '2020-03-05T05:00:00.000Z', ratingImage: {small: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4starsb.png', large: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4stars.png'}, rating: 4, _rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/134148824/Ratings/151394'}}}
    };


    return [
      wikimedia,
      charitynavigator,
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
