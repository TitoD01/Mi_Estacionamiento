import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegestacionamientoPage } from './regestacionamiento.page';

describe('RegestacionamientoPage', () => {
  let component: RegestacionamientoPage;
  let fixture: ComponentFixture<RegestacionamientoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegestacionamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
