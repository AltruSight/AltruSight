import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteNonprofitsComponent } from './favorite-nonprofits.component';

describe('FavoriteNonprofitsComponent', () => {
  let component: FavoriteNonprofitsComponent;
  let fixture: ComponentFixture<FavoriteNonprofitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteNonprofitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteNonprofitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
