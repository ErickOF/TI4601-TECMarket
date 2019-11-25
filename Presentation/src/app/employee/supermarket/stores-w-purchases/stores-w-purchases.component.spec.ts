import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWPurchasesComponent } from './stores-w-purchases.component';

describe('StoreWPurchasesComponent', () => {
  let component: StoreWPurchasesComponent;
  let fixture: ComponentFixture<StoreWPurchasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreWPurchasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreWPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
