import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, ViewChild } from '@angular/core';
import { db } from '../../../services/database';
import { ReloadService } from '../../../services/reload_service';
import { ToDoListComponent } from '../../lists/to-do-list/to-do-list.component';

@Component({
  selector: 'app-new-list-modal',
  templateUrl: './new-list-modal.component.html',
  styleUrls: ['./new-list-modal.component.scss']
})
export class NewListModalComponent {

  private backdrop: HTMLElement | undefined;
  style: any;

  constructor(@Inject(DOCUMENT) private document: Document, private reloadService: ReloadService) { }


  show() {
    this.document.body.classList.add('modal-open');
    this.style = { 'display': 'block' };
    this.showBackdrop();
  }

  hide() {
    this.document.body.classList.remove('modal-open');
    this.style = { 'display': 'none' };
    this.hideBackdrop();
  }

  showBackdrop() {
    this.backdrop = this.document.createElement('div');
    this.backdrop.classList.add('modal-backdrop');
    this.backdrop.classList.add('show');
    this.document.body.appendChild(this.backdrop);
  }

  hideBackdrop() {
    this.backdrop!.remove();
  }

  listName: string = '';
  listDescription: string = '';


  async onSubmit() {
    if (this.listName.trim() === '') {
      alert('Il nome della lista è obbligatorio.');
      return;
    }

    const allLists = await db.getAllToDoList();
    const listExists = allLists.some(list => list.title === this.listName);
    if (listExists) {
      alert('Esiste già una lista con lo stesso nome.');
      return;
    }

    db.addTodoList({
      title: this.listName,
      description: this.listDescription
    }).then(() => {
      this.reloadService.reloadLists();
      this.listName = '';
      this.listDescription = '';
    }).catch(error => {
      alert(`Errore durante la creazione della nuova lista: ${error}`);
      this.listName = '';
      this.listDescription = '';
    });
    this.hide();
  }

}