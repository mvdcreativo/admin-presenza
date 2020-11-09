import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassDilogComponent } from './new-pass-dilog.component';

describe('NewPassDilogComponent', () => {
  let component: NewPassDilogComponent;
  let fixture: ComponentFixture<NewPassDilogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPassDilogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPassDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
