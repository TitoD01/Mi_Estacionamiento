import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegclientePage } from './regcliente.page';

describe('RegclientePage', () => {
  let component: RegclientePage;
  let fixture: ComponentFixture<RegclientePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
