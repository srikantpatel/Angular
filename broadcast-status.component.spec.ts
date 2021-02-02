import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastStatusComponent } from './broadcast-status.component';

describe('BroadcastStatusComponent', () => {
  let component: BroadcastStatusComponent;
  let fixture: ComponentFixture<BroadcastStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
