import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockDetailListComponent } from './block-detail-list.component';

describe('BlockDetailListComponent', () => {
  let component: BlockDetailListComponent;
  let fixture: ComponentFixture<BlockDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockDetailListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
