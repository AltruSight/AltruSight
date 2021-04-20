// TODO: List of friends page, with friends search and recommended friends features

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})
export class FriendsPageComponent implements OnInit {
  friends: Friend[] = [
    {profilePic: '../../assets/profile-placeholder.png', name: 'John Doe',
     bio: 'The Ronald McDonald House'},
    {profilePic: '../../assets/profile-placeholder.png', name: 'Jane Doe',
     bio: 'Wikipedia'},
    {profilePic: '../../assets/profile-placeholder.png', name: 'Mark Scott',
     bio: 'Heifer International'},
    {profilePic: '../../assets/profile-placeholder.png', name: 'Tom Scott',
     bio: 'The Hero Foundation'},
    {profilePic: '../../assets/profile-placeholder.png', name: 'Sarah Thompson',
     bio: 'Guitar Heroes Inc.'},
    {profilePic: '../../assets/profile-placeholder.png', name: 'Henry Thompson',
     bio: 'Playbooks for Free'},
    {profilePic: '../../assets/profile-placeholder.png', name: 'William Fields',
     bio: 'Novice Spells Database'},
    {profilePic: '../../assets/profile-placeholder.png', name: 'Wendy Fields',
     bio: 'Lambert Facial Reconstruction Fund'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getFriends(): Friend[] {
    return this.friends;
  }
}

export class Friend {
  constructor(
    public profilePic: string,
    public name: string,
    public bio: string,
  ){}
}