import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UbicationService } from 'src/app/shared/services/ubications/ubication.service';
import { Observable } from 'rxjs';
import { State, City, Municipality, Neighborhood } from 'src/app/shared/interfaces/ubication';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgSwitchDefault } from '@angular/common';


@Component({
  templateUrl: './modal-locations.component.html',
  styleUrls: ['./modal-locations.component.scss']
})
export class ModalLocationsComponent implements OnInit {

  public form: FormGroup

  states: Observable<State[]>;
  cities: Observable<City[]>;
  municipalities: Observable<Municipality[]>;
  neighborhoods: Observable<Neighborhood[]>;

  barrio:boolean = false;
  ciudad:boolean = false;
  municipalidad:boolean = false;

  constructor(
    private fb: FormBuilder,
    private ubicationService: UbicationService,
    public dialogRef: MatDialogRef<ModalLocationsComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any 

  ) { 
    this.createForm()
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({data: this.form.value, location_type: this.data.typeLocation});
  }



  ngOnInit(): void {
   
    switch (this.data.typeLocation) {
      case "neighborhoods":
        this.barrio = true
        break;
      
      case "cities":
        this.ciudad = true
        break;
      
      case "municipalities":
        this.municipalidad = true
        break;
        
          
      default:
        break;
    }
    
    this.states = this.ubicationService.getStates();
    this.cities = this.ubicationService.getCities();
    this.municipalities = this.ubicationService.getMunicipality();
    this.neighborhoods = this.ubicationService.getNeighborhoods();

  }


  createForm(){
 
    // console.log(this.productEdit);
    const dataEdit = this.data.elementEdit;
    console.log(dataEdit);
    
    this.form = this.fb.group(
      {
        country_id: 1,
        name:  [dataEdit?.name, Validators.required],
        code:  [dataEdit?.code, Validators.required],
        neighborhood_id:  [dataEdit?.neighborhood_id, Validators.required] ,

        city_id: [dataEdit?.city_id],
        province_id: [dataEdit?.state_id],
        municipality_id: [dataEdit?.municipality_id],

      }
    )
  }



  public onSelectState() {
    this.form.controls['city_id'].setValue(null, { emitEvent: false });
    this.form.controls['municipality_id'].setValue(null, { emitEvent: false });
    this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });
  }
  public onSelectCity() {
    this.form.controls['municipality_id'].setValue(null, { emitEvent: false });
    this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });

  }
  public onSelectMunicipality() {
    this.form.controls['neighborhood_id'].setValue(null, { emitEvent: false });
  }
  public onSelectNeighborhood() {
    // this.form.controls['street'].setValue(null, {emitEvent: false});
  }
}
