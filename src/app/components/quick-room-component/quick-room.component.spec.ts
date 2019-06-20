import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRoomComponent } from './quick-room.component';

describe('QuickRoomComponentComponent', () => {
  let component: QuickRoomComponent;
  let fixture: ComponentFixture<QuickRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
