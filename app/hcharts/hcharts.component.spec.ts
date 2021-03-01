import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HchartsComponent } from './hcharts.component';

describe('HchartsComponent', () => {
  let component: HchartsComponent;
  let fixture: ComponentFixture<HchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
