import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationDetailsPage } from './location-details.page';

describe('LocationDetailsPage', () => {
  let component: LocationDetailsPage;
  let fixture: ComponentFixture<LocationDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocationDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
