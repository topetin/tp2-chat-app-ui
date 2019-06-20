import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRoomDialogComponent } from './quick-room-dialog.component';

describe('QuickRoomDialogComponent', () => {
  let component: QuickRoomDialogComponent;
  let fixture: ComponentFixture<QuickRoomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
