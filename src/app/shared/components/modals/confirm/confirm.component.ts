import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Data {
  name:string;
  message?:string;
  value:boolean
}
@Component({
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})


export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) 
    {}


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.data);
    
  } 
  confirm(){
    this.data.value = true;
    this.dialogRef.close(this.data)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
