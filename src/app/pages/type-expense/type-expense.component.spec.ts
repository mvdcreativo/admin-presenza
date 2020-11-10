import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeExpenseComponent } from './type-expense.component';

describe('TypeExpenseComponent', () => {
  let component: TypeExpenseComponent;
  let fixture: ComponentFixture<TypeExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
