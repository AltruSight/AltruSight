import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonprofitPageComponent } from './nonprofit-page.component';

describe('NonprofitPageComponent', () => {
  let component: NonprofitPageComponent;
  let fixture: ComponentFixture<NonprofitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonprofitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonprofitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
