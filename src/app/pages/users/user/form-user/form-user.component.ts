import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Validators } from "@angular/forms";
import { Fields, OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { Location } from '@angular/common';


@Component({
  selector: 'mvd-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit, OnDestroy {

  @Input()idUser :number;
  subcriptions: Subscription[] = [];
  userEdit: User;
  urlReturn: any;
  typesDocIden: OptionSelect[] 
  fields: Fields[];
  
  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.typesDocIden = [
      {name: 'D.N.I.', value:'D.N.I.'},
      {name: 'Pasaporte', value:'Pasaporte'}
    ];
    if(this.idUser){
      this.getUser(this.idUser)
    }else{
      this.setFields()
    }
  }




  getUser(id){
    this.subcriptions.push(this.userService.getUser(id).subscribe(
        res => {
          console.log(res);
          
          this.userEdit = res
          // console.log(res);
          this.setFields()
        })
    )
  }


  setFields() {
    
    this.fields = [
      { nameControl: 'id', type: 'hidden', value: this.userEdit?.id, label: 'Id' },
      { nameControl: 'image', type: 'image', value: this.userEdit?.account?.image, label: 'Imagen' },
      { nameControl: 'name', type: 'text', value: this.userEdit?.name, label: 'Nombre', validators: [Validators.required] },
      { nameControl: 'last_name', type: 'text', value: this.userEdit?.last_name, label: 'Apellido', validators: [Validators.required] },
      { nameControl: 'type_doc_iden', type: 'select', value: this.userEdit?.account?.type_doc_iden, label: 'Tipo documento de identidad',options: this.typesDocIden , validators: [Validators.required] },
      { nameControl: 'dni', type: 'text', value: this.userEdit?.account?.dni, label: 'Nº documento', validators: [Validators.required] },
      { nameControl: 'email', type: 'text', value: this.userEdit?.email, label: 'Email', validators: [Validators.required] },
      { nameControl: 'address', type: 'text', value: this.userEdit?.account?.address, label: 'Dirección' },
      { nameControl: 'phone', type: 'text', value: this.userEdit?.account?.phone, label: 'Teléfono', validators: [Validators.required] },
      { nameControl: 'movil', type: 'text', value: this.userEdit?.account?.movil, label: 'Celular' },
      { nameControl: 'company', type: 'text', value: this.userEdit?.account?.company, label: 'Empresa (si corresponde)' },
      { nameControl: 'cuit', type: 'text', value: this.userEdit?.account?.cuit, label: 'CUIT (si corresponde)' },
    ]
    
  }

  dataSubmit(e) {
    console.log(e);
    
      const data = e
      if (this.userEdit) {
  
          this.updateUser(data)
          
      } else {
  
        this.addUser(data)
  
      }
    


  }

  addUser(data) {
    this.userService.storeUser(data).pipe(take(1)).subscribe(
      res => {
        console.log(res);
        
        this.location.back();
        // this.userService.setUserOnEdit(res)
      }
    )
  }


  updateUser(data) {
    this.userService.updateUser(data).pipe(take(1)).subscribe(
      res => {
        console.log(res);
        this.location.back();
      }
    )
  }

  deleteUser(id){
    this.subcriptions.push(this.userService.deleteUser(id).subscribe(res=> this.router.navigate([this.urlReturn])))
  }

  ngOnDestroy() {
    this.subcriptions.map(v=>v.unsubscribe())
  }
}
