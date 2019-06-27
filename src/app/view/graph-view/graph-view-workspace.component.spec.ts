import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphViewWorkspaceComponent } from './graph-view-workspace.component';

describe('GraphViewWorkspaceComponent', () => {
  let component: GraphViewWorkspaceComponent;
  let fixture: ComponentFixture<GraphViewWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphViewWorkspaceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphViewWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
