import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlugService {

  constructor() { }


  public create(data) {
        
    // Reemplaza los carácteres especiales | simbolos con un espacio 
    let slug = data.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
    
    // Corta los espacios al inicio y al final del dataing 
    slug = slug.replace(/^\s+|\s+$/gm,'');
    
    // Reemplaza el espacio con guión  
    slug = slug.replace(/\s+/g, '-');

    return slug;
    
  }
}
