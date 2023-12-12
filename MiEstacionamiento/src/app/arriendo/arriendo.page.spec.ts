import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArriendoPage } from './arriendo.page';

describe('ArriendoPage', () => {
  let component: ArriendoPage;
  let fixture: ComponentFixture<ArriendoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ArriendoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
