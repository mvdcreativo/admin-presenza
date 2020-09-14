import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { Observable, Subscription } from 'rxjs';
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { Fields, OptionSelect } from 'src/app/shared/components/dinamic-form/interfaces/fields';
import { MatDialog } from '@angular/material/dialog';
import { StatusService } from 'src/app/shared/services/status/status.service';
import { map, take, filter, takeUntil, takeWhile } from 'rxjs/operators';
import { ModalReutilComponent } from 'src/app/shared/components/modals/modal-reutil/modal-reutil.component';
import { Validators } from '@angular/forms';
import { FeaturesService } from "./services/features.service";
import { Feature } from "./interfaces/feature";
import forms  from '../../shared/utils/data/forms.json';


@Component({
  selector: 'mvd-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ////COLUMNAS TABLA
  public columns: Column[] = [
    { title: 'ID', col: 'id' },
    { title: 'Nombre', col: 'name' },
    { title: 'Grupo', col: 'feature' },
    { title: 'Icono', col: 'icon' },
    { title: 'Tipo Valor', col: 'type' },


  ]

  dataSource: Observable<any[]>;

  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result$: Observable<ResponsePaginate>;
  subscroption: Subscription;

  fields: Fields[]
  groupsFeature: Feature[];

  featuresOption: OptionSelect[];
  typeOptions: OptionSelect[]
  subscroptionFeatures: Subscription;

  /////////////


  constructor(
    private featuresService: FeaturesService,
    public dialog: MatDialog,
    private statusSetvice: StatusService
  ) {
    this.typeOptions =  forms.selects.feature_type_valor;
    this.result$ = this.featuresService.resultItems$

  }


  ngOnInit(): void {
    this.getFeatures(this.pageDefault, this.perPage, this.filter, this.orden)
    this.subscroptionFeatures = this.featuresService.getGroupFeatures().subscribe(
      res=> this.featuresOption = res.map( o => { return { name: o.name, value: o.id}})
      )

  }

  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getFeatures(e.pageIndex + 1, e.pageSize)

  }



  getFeatures(currentPage?, perPage?, filter?, sort?) {
    this.subscroption = this.featuresService.getFeatures(currentPage, perPage, filter, sort).subscribe(next => this.loadData());
  }

  loadData() {

    this.dataSource = this.result$.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        return {
          id: x.id,
          name: x.name,
          feature: x.feature?.name,
          feature_id: x.feature_id,
          icon: x.icon,
          type: x.type

        }
      })
      return dataTable;
    }))

    this.totalResut = this.result$.pipe(map(v => v.data.total))
  }

  search(filter) {
    this.getFeatures(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id): Observable<any> {
    return this.featuresService.deleteFeature(id)
  }

  itemAction(event) {
    console.log(event);

    if (event.action === "delete") {
      this.deleteItem(event.element.id).pipe(take(1)).subscribe(res => console.log(res))
    }

    if (event.action === "edit") {
      
      this.openDialog(event.element)
    }

  }



  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscroption.unsubscribe()
    this.subscroptionFeatures.unsubscribe()
  }

  add(){
    
  }

  openDialog(data?) {
    
    const dialogRef = this.dialog.open(ModalReutilComponent, {
      width: '550px',
      data: this.setFields(data)
    });

    return dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
      if(result){
        if (result.id) {
          this.updateFeature(result)
          
        }else{
          this.storeFeature(result)
        }

      }
      
    });
  }


  setFields(elementEdit? : Feature) {    
    // const options = this.groupsFeature.pipe(map(v => { return v.map( o => { return { name: o.name, value: o.id}}) })).subscribe(res => console.log(res))

    const fields = [
      { nameControl: 'id', type: 'hidden', value: elementEdit?.id, label: 'Id' },
      { nameControl: 'feature_id', type: 'select', value: elementEdit?.feature_id, label: 'Grupo', options: this.featuresOption, validators: [Validators.required] },
      { nameControl: 'type', type: 'select', value: elementEdit?.type, label: 'Tipo valor', options: this.typeOptions, validators: [Validators.required] },
      { nameControl: 'name', type: 'text', value: elementEdit?.name, label: 'Nombre', validators: [Validators.required] },  
    ]

    return fields
  }

  storeFeature(data){
    this.featuresService.storeFeature(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);
      }
    )
  }

  updateFeature(data){
    this.featuresService.updateFeature(data).pipe(take(1)).subscribe(
      res=> {
        console.log(res);        
      }
    )
  }


}
