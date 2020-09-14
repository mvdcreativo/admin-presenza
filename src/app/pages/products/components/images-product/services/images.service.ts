import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product, Response } from "./../../../interfaces/product";
import { ProductService } from '../../../services/product.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  public progressSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(100);
  public loadingImage$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {
    this.loadingImage$.next(false)
   }


  // updateImages(data){
  //   this.http.post<Product>(`${environment.API}properties`, data)
  // }

  getImages() {
    this.http.get<Product>(`${environment.API}properties`)
    

  }

  updateImage(data) {
    data.map(
      d => this.http.put(`${environment.API}images/${d.id}`, d).pipe(take(1)).subscribe()
    )
  }

  uploadImage(data: Product, files: FileList, index?: number) {

    const formData = new FormData();
    console.log(files);
    const position = data.images.length -1;

    for (let i = 0; i < files.length; i++) {
      formData.append('images[]', files[i])
      // formData.append("_method", "PUT")
    }

    formData.append("_method", "PUT")

    return this.http.post(`${environment.API}properties/${data.id}`, formData, {
      observe: 'events',
      reportProgress: true
    }).subscribe(
      (event: HttpEvent<Object>) => {

        // console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Upload Concluído');
          console.log(event.body);
          const product: any = event.body
          console.log(product.data);
          this.loadingImage$.next(false)
          this.productService.setProductOnEdit(product.data);

        } else if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((event.loaded * 100) / event.total);
          console.log('Progresso', percentDone);
          this.progressSubject$.next(percentDone)
          this.loadingImage$.next(true)
        }
      }
    )
  }


  removeImageId(imageID, id) {
    let httpParams = new HttpParams().set('image_id', imageID);
    let options = { params: httpParams };
    return this.http.delete<Response>(`${environment.API}properties/${id}`, options).pipe(
      take(1),
      map( v => v.data)
    ).subscribe(
      res => {
        if(res){
          const productEdit = this.productService.productOnEdit.pipe( map( v => {
            v.images = res.images;
            return v
          }),take(5)).subscribe(
            res =>  this.productService.setProductOnEdit(res)
          )

        }
        
       

      }

    )
  }

  getImageLoading$():Observable<any>{
    return this.loadingImage$;
  }
  setImageLoading(status):void{
    this.loadingImage$.next(status)
  }
  getProsess$():Observable<number>{
    return this.progressSubject$;
  }
  setProsess(status):void{
    this.progressSubject$.next(status)
  }
}
