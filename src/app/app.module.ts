import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './widget/navbar/navbar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { ToDoListComponent } from './widget/lists/to-do-list/to-do-list.component';
import { ToDoItemListComponent } from './widget/lists/to-do-item-list/to-do-item-list.component';
import { NewToDoItemFormComponent } from './widget/new-to-do-item-form/new-to-do-item-form.component';
import { BadgeComponent } from './widget/badge/badge.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditListModalComponent } from './widget/modal/edit-list-modal/edit-list-modal.component';
import { NewListModalComponent } from './widget/modal/new-list-modal/new-list-modal.component';
import { FooterComponent } from './widget/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    ToDoListComponent,
    ToDoItemListComponent,
    NewToDoItemFormComponent,
    BadgeComponent,
    EditListModalComponent,
    NewListModalComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
