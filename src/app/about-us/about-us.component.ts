import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
  })
  export class AboutUs implements OnInit {
    constructor(public router: Router) { }

    ngOnInit(): void {
    }
  }