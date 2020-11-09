import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassDielogComponent } from './reset-pass-dielog.component';

describe('ResetPassDielogComponent', () => {
  let component: ResetPassDielogComponent;
  let fixture: ComponentFixture<ResetPassDielogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPassDielogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassDielogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
