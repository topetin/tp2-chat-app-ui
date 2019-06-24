import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickRoomEnterComponent } from './quick-room-enter.component';

describe('QuickRoomEnterComponent', () => {
  let component: QuickRoomEnterComponent;
  let fixture: ComponentFixture<QuickRoomEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickRoomEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickRoomEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
