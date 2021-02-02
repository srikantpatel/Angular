import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListNumberComponent } from './black-list-number.component';

describe('BlackListNumberComponent', () => {
  let component: BlackListNumberComponent;
  let fixture: ComponentFixture<BlackListNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackListNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackListNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
