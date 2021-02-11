import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-nonprofit-page',
  templateUrl: './nonprofit-page.component.html',
  styleUrls: ['./nonprofit-page.component.scss']
})
export class NonprofitPageComponent implements OnInit {
  nonprofitName = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.nonprofitName = this.route.snapshot.paramMap.get('nonprofit-id') as string;
  }
}
