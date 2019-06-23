import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRoomShareComponent } from './quick-room-share.component';

describe('QuickRoomShareComponent', () => {
  let component: QuickRoomShareComponent;
  let fixture: ComponentFixture<QuickRoomShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRoomShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRoomShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
