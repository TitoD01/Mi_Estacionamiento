import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegduenoPage } from './regdueno.page';

describe('RegduenoPage', () => {
  let component: RegduenoPage;
  let fixture: ComponentFixture<RegduenoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegduenoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
