import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarClientsComponent } from './similar-clients.component';


describe('SimilarClientsComponent', () => {
  let component: SimilarClientsComponent;
  let fixture: ComponentFixture<SimilarClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
