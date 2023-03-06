import { Component, OnInit, ViewChild } from '@angular/core';
import { NewListModalComponent } from 'src/app/widget/modal/new-list-modal/new-list-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  @ViewChild('appDialog') reusableModal: NewListModalComponent | undefined;


  showDialog() {
    this.reusableModal!.show()
  }


}