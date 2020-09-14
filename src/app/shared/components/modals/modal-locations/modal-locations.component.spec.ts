import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLocationsComponent } from './modal-locations.component';

describe('ModalLocationsComponent', () => {
  let component: ModalLocationsComponent;
  let fixture: ComponentFixture<ModalLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
