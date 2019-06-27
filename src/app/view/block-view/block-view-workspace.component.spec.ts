import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockViewWorkspaceComponent } from './block-view-workspace.component';

describe('BlockViewWorkspaceComponent', () => {
  let component: BlockViewWorkspaceComponent;
  let fixture: ComponentFixture<BlockViewWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockViewWorkspaceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockViewWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
