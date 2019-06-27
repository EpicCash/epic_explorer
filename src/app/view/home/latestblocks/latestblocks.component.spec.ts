import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestblocksComponent } from './latestblocks.component';

describe('LatestblocksComponent', () => {
  let component: LatestblocksComponent;
  let fixture: ComponentFixture<LatestblocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestblocksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestblocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
