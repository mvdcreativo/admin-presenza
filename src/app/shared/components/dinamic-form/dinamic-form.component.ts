import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fields } from "./interfaces/fields";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mvd-dinamic-form',
  templateUrl: './dinamic-form.component.html',
  styleUrls: ['./dinamic-form.component.scss'],
})
export class DinamicFormComponent implements OnInit {

  @Input() fields : Fields[] = null
  @Output() value : EventEmitter<any> = new EventEmitter

  subscription: Subscription

  constructor(
    private fb:FormBuilder
  ) { 
    this.form = this.fb.group({})
  }
  
  public form : FormGroup

  ngOnInit(): void {
    this.buildForm()
    console.log(this.form.value);
    
  }


  changeForm(value){
    // console.log(value);
    
          this.value.emit(value)

  }

  private buildForm(){
    
    if (this.fields) {
      const controls = this.fields.map(
        v => {
          return this.form.addControl( v.nameControl , this.fb.control(v.value, v.validators));
        }
      )
      
    }
  }

}
