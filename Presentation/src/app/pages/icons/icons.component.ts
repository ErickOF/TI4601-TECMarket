import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  standalone: false,
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public copy: string;
  constructor() { }

  ngOnInit() {
  }
}
