import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'mvd-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  @Output() changeSearch :EventEmitter<string> = new EventEmitter;
  @Input() noteFilterBy : string;

  searchInput = new FormControl('',[])

  
  constructor() { }

  ngOnInit(): void {

    this.searchInput.valueChanges
    .pipe(debounceTime(500))
    .subscribe( 
      value => {
        console.log(value);
  
          this.changeSearch.emit(value)

  
      },
      error => console.log(error)
    )

  }



}
