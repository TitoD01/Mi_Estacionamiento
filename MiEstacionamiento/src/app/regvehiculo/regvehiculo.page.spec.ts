import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegvehiculoPage } from './regvehiculo.page';

describe('RegvehiculoPage', () => {
  let component: RegvehiculoPage;
  let fixture: ComponentFixture<RegvehiculoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegvehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
