import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonprofitSearchPageComponent } from './nonprofit-search-page.component';

describe('NonprofitSearchPageComponent', () => {
  let component: NonprofitSearchPageComponent;
  let fixture: ComponentFixture<NonprofitSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonprofitSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonprofitSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
