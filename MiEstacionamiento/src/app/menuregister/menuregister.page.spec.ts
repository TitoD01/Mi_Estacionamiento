import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuregisterPage } from './menuregister.page';

describe('MenuregisterPage', () => {
  let component: MenuregisterPage;
  let fixture: ComponentFixture<MenuregisterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
