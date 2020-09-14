import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(){
    
  }
  openSnackBar(message: string, action: string = 'x') {
    this._snackBar.open(message, action, {
      duration: 1000,

    });
  }

}
