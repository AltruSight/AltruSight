// ng generate component home was used to create boilerplate

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nonprofit } from '../misc-services/nonprofits.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  altViewOpened = false;
  // TODO: Add donation time
  donations: Donation[] = [
    {id: 0, donorName: 'Jules Winnfield', donationDescription: 'Le Big Mac',
     donationCharityName: 'The Ronald McDonald House'},
    {id: 1, donorName: 'Tai Lopez', donationDescription: 'You know what I like more than materialistic things? Knowledge.',
     donationCharityName: 'Wikipedia'},
    {id: 2, donorName: 'Leo Messi', donationDescription: 'GOAT donating a goat',
     donationCharityName: 'Heifer International'},
    {id: 3, donorName: 'Vincent Vega', donationDescription: 'Check them out!',
     donationCharityName: 'The Hero Foundation'},
    {id: 4, donorName: 'Buckethead', donationDescription: 'This nonprofit is shredding...',
     donationCharityName: 'Guitar Heroes Inc.' },
    {id: 5, donorName: 'Barney Stinson', donationDescription: 'Great plays in this playbook',
     donationCharityName: 'Playbooks for Free' },
    {id: 6, donorName: 'Selena Gomez', donationDescription: 'Expecto Patronum!',
     donationCharityName: 'Novice Spells Database' },
    {id: 7, donorName: 'Geralt of Rivia', donationDescription: 'A coin for your witcher',
     donationCharityName: 'Lambert Facial Reconstruction Fund' },
  ];

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  getProfilePictureURL(): string {
    return '../../assets/images/profile-placeholder.png';
  }

  getUsername(): string { return 'Anduru'; }

  // TODO: Actually implement a rotating featured nonprofit of the week programmatically
  getFeaturedNonprofit(): Nonprofit {
    const wikimedia = {
      // tslint:disable-next-line:max-line-length
      charityNavigatorURL: 'https://www.charitynavigator.org/?bay=search.summary&orgid=11212&utm_source=DataAPI&utm_content=6bc9f3c8', currentCEO: {name: 'Katherine Maher ', title: 'Executive Director'}, tagLine: 'Imagine a world in which every single human being can freely share in the sum of all knowledge', charityName: 'Wikimedia Foundation', ein: '200049703', currentBoardChair: {name: 'María Sefidari', title: 'Chair'}, orgID: 11212, mission: 'The Wikimedia Foundation, Inc. is dedicated to encouraging the growth, development and distribution of free, multilingual content, and to providing the full content of these wiki-based projects to the public free of charge. The Foundation operates some of the largest collaboratively edited reference projects in the world, including Wikipedia, the fourth most visited website in the world. In collaboration with a network of chapters, the Foundation provides the essential infrastructure and an organizational framework for the support and development of multilingual wiki projects and other endeavors which serve this mission.', phoneNumber: '4158396885', websiteURL: 'http://wikimediafoundation.org/', generalEmail: 'donate@wikimedia.org', activeAdvisories: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/200049703/Advisories?status=ACTIVE'}}}, removedAdvisories: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/200049703/Advisories?status=REMOVED'}}}, ratingHistory: {_rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/200049703/Ratings'}}}, category: {image: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/categories/arts.png?utm_source=DataAPI&utm_content=6bc9f3c8', charityNavigatorURL: 'https://www.charitynavigator.org/index.cfm?bay=search.categories&categoryid=2&utm_source=DataAPI&utm_content=6bc9f3c8', categoryName: 'Arts, Culture, Humanities', categoryID: 2}, cause: {causeID: 5, charityNavigatorURL: 'https://www.charitynavigator.org/index.cfm?bay=search.results&cgid=2&cuid=5&utm_source=DataAPI&utm_content=6bc9f3c8', causeName: 'Public Broadcasting and Media', image: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/causes/small/public_radio.gif?utm_source=DataAPI&utm_content=6bc9f3c8'}, irsClassification: {deductibility: 'Contributions are deductible', subsection: '501(c)(3)', assetAmount: 176019709, nteeType: 'Educational Institutions and Related Activities', nteeSuffix: null, incomeAmount: 135577430, filingRequirement: '990 (all other) or 990EZ return', classification: 'Educational Organization', latest990: 'June, 2019', rulingDate: 'March, 2005', nteeCode: 'B60', groupName: null, affiliation: 'Independent - the organization is an independent organization or an independent auxiliary (i.e., not affiliated with a National, Regional, or Geographic grouping of organizations).', deductibilityCode: '1', foundationStatus: 'Organization which receives a substantial part of its support from a governmental unit or the general public   170(b)(1)(A)(vi)', nteeClassification: 'Adult, Continuing Education', accountingPeriod: 'June', exemptOrgStatusCode: '01', exemptOrgStatus: 'Unconditional Exemption', deductibilityDetail: null, nteeLetter: 'B'}, mailingAddress: {country: null, stateOrProvince: 'CA', city: 'San Francisco', postalCode: '94104', streetAddress1: '1 Montgomery Street', streetAddress2: 'Suite 1600'}, currentRating: {score: 98.14, ratingID: 147516, publicationDate: '2019-11-01T04:00:00.000Z', ratingImage: {small: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4starsb.png', large: 'https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4stars.png'}, rating: 4, _rapid_links: {related: {href: 'https://api.data.charitynavigator.org/v2/Organizations/200049703/Ratings/147516'}}}
    };

    return wikimedia;
  }

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
    return '../../assets/images/profile-placeholder.png';
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

  toggleAltView(): void {
    this.altViewOpened = !this.altViewOpened;
  }

  navigateTo(page: string): void {
    this.router.navigateByUrl(`${page}`);
  }

  navigateToNonprofit(nonprofitId: string): void {
    this.router.navigateByUrl(`nonprofit/${nonprofitId}`);
  }

  getDonations(): Donation[] {
    return this.donations;
  }
}

export class Donation {
  constructor(
    public id: number,
    public donorName: string,
    public donationDescription: string,
    public donationCharityName: string
  ){}
}
