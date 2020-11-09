import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-pass-dielog',
  templateUrl: './reset-pass-dielog.component.html',
  styleUrls: ['./reset-pass-dielog.component.scss']
})
export class ResetPassDielogComponent implements OnInit {
  msg: string;

  constructor(
    public dialogRef: MatDialogRef<ResetPassDielogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  formEmail : FormGroup;

  ngOnInit(): void {
    this.formEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })


  }


  enviar(){

    this.dialogRef.close(this.formEmail.value);

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
