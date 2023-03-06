import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // declare variable to store current year
  currentYear: number;

  // constructor runs when class instance is created
  constructor() {
    // set the current year to the current year
    this.currentYear = new Date().getFullYear();
  }
}
