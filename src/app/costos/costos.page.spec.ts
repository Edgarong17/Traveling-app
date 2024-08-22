import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CostosPage } from './costos.page';

describe('CostosPage', () => {
  let component: CostosPage;
  let fixture: ComponentFixture<CostosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CostosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
