import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation  } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { Column } from "./interfaces/table";
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'mvd-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit {

  @Input() dataSource
  @Input() columns : Column[];
  @Output() actionChange : EventEmitter<any> = new EventEmitter;
  displayedColumns: any[];




  constructor(
    public dialog: MatDialog,
    private router: Router

  ) { 
    new MatTableDataSource(this.dataSource)
    
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(v => v.col)
    this.displayedColumns.push('actions')
  }

  editItem(element){

      const action = {action: 'edit', element: element}
      this.actionChange.emit(action)

    
  }

  deleteItem(element){
    this.openDialog(element)
  }

  openDialog(element):void {
    let name 
    if (element?.name) {
      name = element.name
    } else {
      name = element.title
    }
    
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {name: name, message: "", value: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.value){
        const action = {action: 'delete', element: element}
        this.actionChange.emit(action)
      }
    });
    
  }

  publication(element){
    if(element){

      this.router.navigate(['/publicaciones/publicacion', element.publication_id])
    }
  }
}
