import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegvehiPage } from './regvehi.page';

describe('RegvehiPage', () => {
  let component: RegvehiPage;
  let fixture: ComponentFixture<RegvehiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegvehiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
