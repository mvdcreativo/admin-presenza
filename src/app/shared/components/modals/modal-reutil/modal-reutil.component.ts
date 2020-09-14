import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fields } from '../../dinamic-form/interfaces/fields';

@Component({
  templateUrl: './modal-reutil.component.html',
  styleUrls: ['./modal-reutil.component.scss']
})
export class ModalReutilComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<ModalReutilComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  action(e){
    this.dialogRef.close(e);
    
  }

}
