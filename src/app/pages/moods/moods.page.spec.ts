import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoodsPage } from './moods.page';

describe('MoodsPage', () => {
  let component: MoodsPage;
  let fixture: ComponentFixture<MoodsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
