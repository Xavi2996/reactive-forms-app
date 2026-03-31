import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe],
  templateUrl: './dinamic-page.component.html',
  styleUrl: './dinamic-page.component.css'
})
export class DinamicPageComponent {

}
