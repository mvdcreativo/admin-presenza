import { Component, OnInit, ViewChild } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PublicationsService } from "./services/publications.service";
import { ResponsePaginate, Response } from 'src/app/shared/interfaces/response';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'mvd-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

  // displayedColumns: string[] = ['code', 'title', 'user_owner.name', 'address', 'neighborhood.name'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    ////COLUMNAS TABLA
    public columns: Column[] = [
      { title: 'ID', col: 'id' },
      { title: 'Título', col: 'title' },
      { title: 'Barrio', col: 'neighborhood' },
      { title: 'Publicada ', col: 'created_at', pipe: "dd/MM/yyyy" },
      { title: 'Actualizada', col: 'updated_at', pipe: "dd/MM/yyyy" },
    ]

  dataSource:Observable<any[]>;
  

  ////paginator
  totalResut: Observable<number>;
  pageDefault = 1;
  perPage: number = 10;
  orden: string = 'desc';
  filter: string = '';
  result: Observable<ResponsePaginate>;
  subscroption: Subscription;


  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getPublications(e.pageIndex + 1, e.pageSize)

  }
  /////////////


  constructor(
    private publicationsService: PublicationsService,
    private router: Router
  ) {
    this.result = this.publicationsService.resultItems$

  }
  
  
  ngOnInit(): void {
    
    this.getPublications(this.pageDefault, this.perPage, this.filter, this.orden)

  }





  getPublications(currentPage?, perPage?, filter?, sort?) {
    this.subscroption = this.publicationsService.getPublications(currentPage, perPage, filter, sort).subscribe(next => this.loadData());
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        
        return {
          id: x.id,
          title: x.property?.title,
          updated_at: x.updated_at,
          created_at: x.created_at,
          neighborhood: x.property?.neighborhood.name
        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter){
    this.getPublications(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id):Observable<any>{
    return this.publicationsService.deletePublication(id)
  }

  itemAction(event){
    console.log(event);
    
    if(event.action === "delete"){
      this.deleteItem(event.element.id).pipe(take(1)).subscribe( res=> console.log(res))
    }
  
    if(event.action === "edit"){
      this.router.navigate(['/publicaciones/publicacion', event.element.id])    }
    
    }



    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.subscroption.unsubscribe()
    }
}
