import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAppendComponent } from './block-append.component';

describe('BlockAppendComponent', () => {
  let component: BlockAppendComponent;
  let fixture: ComponentFixture<BlockAppendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockAppendComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockAppendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
