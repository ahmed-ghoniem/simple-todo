import { Component, Inject, OnInit } from '@angular/core';
declare var $: any;
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    $(this.document).keyup(function (e) {
      if (e.key === 'Escape') {
        $('.waiting-msg').removeClass('active');
      }
    });
  }
}
