import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegestPage } from './regest.page';

describe('RegestPage', () => {
  let component: RegestPage;
  let fixture: ComponentFixture<RegestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
