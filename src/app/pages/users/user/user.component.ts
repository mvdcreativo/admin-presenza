import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'mvd-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  id: number;

  constructor(
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData()
  }


  loadData(){
    this.activateRouter.paramMap.subscribe(
      (params: Params) => {
        if (params.params.id) {
            this.id = params.params.id
            // console.log(this.id)
        } 
      }
    )
  }
}
