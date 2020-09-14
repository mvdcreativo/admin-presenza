import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReutilComponent } from './modal-reutil.component';

describe('ModalReutilComponent', () => {
  let component: ModalReutilComponent;
  let fixture: ComponentFixture<ModalReutilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReutilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReutilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
