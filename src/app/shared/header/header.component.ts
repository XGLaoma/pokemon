import { Component } from '@angular/core';
import { formatDate } from '@angular/common'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public fecha: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-MX');
 
}

