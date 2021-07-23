import { Component, OnInit, ChangeDetectionStrategy, Input, Inject, ViewChild, AfterViewInit, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mvd-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit, AfterViewInit {

  @Input() image: any;
  @Input() showDelete;
  @Output() updateRotateImage: EventEmitter<any> = new EventEmitter
  @Output() removeImage: EventEmitter<any> = new EventEmitter
  url: any
  rotate: number = 0



  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  ngOnInit(): void {
    this.url = this.image.url;
  }

  ngAfterViewInit(): void {


  }

  rotateImage() {

      this.rotate = this.rotate + 90;
      const data = {image: this.image, rotate: this.rotate}
      this.updateRotateImage.emit(data)
      this.rotate = 0;
  }

  remove(id){
    this.removeImage.emit(id)
  }
}
