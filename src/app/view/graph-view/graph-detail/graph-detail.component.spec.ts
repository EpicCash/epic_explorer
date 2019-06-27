import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDetailComponent } from './graph-detail.component';

describe('GraphDetailComponent', () => {
  let component: GraphDetailComponent;
  let fixture: ComponentFixture<GraphDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
