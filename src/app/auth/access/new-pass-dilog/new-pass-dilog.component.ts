import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-new-pass-dilog',
  templateUrl: './new-pass-dilog.component.html',
  styleUrls: ['./new-pass-dilog.component.scss']
})
export class NewPassDilogComponent implements OnInit {

  formNueva : FormGroup
  msg: string = ""
  error: string;


  constructor(
    public dialogRef: MatDialogRef<NewPassDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formNueva = this.fb.group({
      email: [this.data.data.params.email],
      token: [this.data.data.params.token],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]]
    },{
      validator: this.passwordConfirming
    })
    
  }

  
  updatePass(){
    
    this.dialogRef.close(this.formNueva.value);

  }
  
  get f() { return this.formNueva.controls; }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('password_confirmation').value) {
        return {invalid: true};
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
