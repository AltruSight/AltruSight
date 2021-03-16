import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatsPageComponent } from './account-stats-page.component';

describe('AccountStatsPageComponent', () => {
  let component: AccountStatsPageComponent;
  let fixture: ComponentFixture<AccountStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountStatsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
