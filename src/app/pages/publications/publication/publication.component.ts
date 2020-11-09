import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Publication } from '../interfaces/publication';


@Component({
  selector: 'mvd-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  id: any;

  constructor(
    private activateRouter: ActivatedRoute,

  ) {

  }

  ngOnInit(): void {
    this.loadData()
  }


  loadData(){
    this.activateRouter.paramMap.subscribe(
      (params: Params) => {
        if (params.params.id) {
            this.id = params.params.id    

        } 
      }
    )
  }


}
