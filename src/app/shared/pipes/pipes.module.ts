import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterNeighborhoodsPipe } from './filter-neighborhoods';
import { FilterStreetsPipe } from './filter-streets.pipe';
import { FilterCityPipe } from './filter-city.pipe';
import { FilterMunicipalityPipe } from './filter-municipality.pipe';
import { DynamicPipePipe } from './dynamic-pipe.pipe';


@NgModule({
    imports: [ 
        CommonModule
    ],
    declarations: [
        FilterByIdPipe,
        FilterNeighborhoodsPipe,
        FilterStreetsPipe,
        FilterCityPipe,
        FilterMunicipalityPipe,
        DynamicPipePipe,
      
        
    ],
    exports: [
        FilterByIdPipe,
        FilterNeighborhoodsPipe,
        FilterStreetsPipe,
        FilterCityPipe,
        FilterMunicipalityPipe,
        DynamicPipePipe,
        
    ],
    providers: [
        DatePipe
    ]
})
export class PipesModule { }
