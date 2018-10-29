import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUIComponent } from './board-ui.component';

describe('BoardUIComponent', () => {
  let component: BoardUIComponent;
  let fixture: ComponentFixture<BoardUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
