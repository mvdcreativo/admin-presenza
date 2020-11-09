import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Column } from 'src/app/shared/components/data-table/interfaces/table';
import { ResponsePaginate } from 'src/app/shared/interfaces/response';
import { UserService } from "./services/user.service";

@Component({
  selector: 'mvd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    ////COLUMNAS TABLA
    public columns: Column[] = [
      { title: 'ID', col: 'id' },
      { title: 'Nombre', col: 'name' },
      { title: 'Email', col: 'email' },
      { title: 'Teléfonos ', col: 'phone'},
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
  title: string;


  paginatorChange(e: PageEvent) {
    console.log(e);
    this.getUsers(e.pageIndex + 1, e.pageSize)

  }
  /////////////


  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.result = this.userService.resultItems$

  }
  
  
  ngOnInit(): void {
    const urlSegments = this.router.url.split("/");
    const segment = urlSegments[1];
    if(segment === "clientes"){
      let filter = "USER";
      this.title = "Clientes";
      this.getUsers(this.pageDefault, this.perPage, filter, this.orden)

    }
    if(segment === "usuarios"){
      let filter = "ADMIN";
      this.title = "Usuarios del Sistema";
      this.getUsers(this.pageDefault, this.perPage, filter, this.orden) 
    }

  }





  getUsers(currentPage?, perPage?, filter?, sort?) {
    this.subscroption = this.userService.getUsers(currentPage, perPage, filter, sort).subscribe(next => this.loadData());
  }

  loadData() {

    this.dataSource = this.result.pipe(map(v => {
      const dataTable = v.data.data.map(x => {
        
        return {
          id: x.id,
          name: `${x.name} ${x.last_name}`,
          email: x.email,
          phone: `${x.account?.phone} / ${x.account?.movil}`,
          // neighborhood: x.property?.neighborhood.name
        }
      })
      return dataTable;
    }))

    this.totalResut = this.result.pipe(map(v => v.data.total))
  }

  search(filter){
    this.getUsers(this.pageDefault, this.perPage, filter, this.orden)
  }

  deleteItem(id):Observable<any>{
    return this.userService.deleteUser(id)
  }

  itemAction(event){
    console.log(event);
    
    if(event.action === "delete"){
      this.deleteItem(event.element.id).pipe(take(1)).subscribe( res=> console.log(res))
    }
  
    if(event.action === "edit"){
      this.router.navigate(['/usuarios/usuario', event.element.id])    }
    
    }



    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.subscroption.unsubscribe()
    }

}
