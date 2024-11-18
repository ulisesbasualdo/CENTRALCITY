import { Component, OnInit } from '@angular/core';
import { TemplateLandingComponent } from "../../templates/template-landing/template-landing.component";
import { IData } from '../../../core/interfaces/i-data';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-page-landing',
  standalone: true,
  imports: [TemplateLandingComponent],
  template: `
    <app-template-landing [data]="data" />
  `,
  styles: ``,
})
export default class PageLandingComponent implements OnInit {
  
  data!: IData[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data: IData[]) => {
        this.data = data;
      },
      error: (error) => {
        console.error('Error fetching data', error);
      }
    });
  }
}
