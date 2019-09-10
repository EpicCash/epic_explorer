import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDetailComponent } from './output-detail.component';

describe('OutputDetailComponent', () => {
  let component: OutputDetailComponent;
  let fixture: ComponentFixture<OutputDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
