import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TodoList } from 'src/app/models/list_model';
import { db } from 'src/app/services/database';
import { ReloadService } from 'src/app/services/reload_service';

@Component({
  selector: 'app-edit-list-modal',
  templateUrl: './edit-list-modal.component.html',
  styleUrls: ['./edit-list-modal.component.scss']
})
export class EditListModalComponent {
  listName: string = '';
  listDescription: string = '';
  list: TodoList | undefined;
  private backdrop: HTMLElement | undefined;
  style: any;

  constructor(@Inject(DOCUMENT) private document: Document, private reloadService: ReloadService) { }


  async show(listId: number) {
    this.document.body.classList.add('modal-open');
    this.style = { 'display': 'block' };
    this.showBackdrop();
    this.list = await db.getToDoList(listId ?? -1);
    this.listName = this.list!.title;
    this.listDescription = this.list!.description ?? '';
  }

  async edit() {
    if (this.listName.trim() === '') {
      alert('Il nome della lista è obbligatorio.');
      return;
    }
    const allLists = await db.getAllToDoList();
    const listExists = allLists.some(existingList => existingList.title === this.listName && existingList.id !== this.list!.id);
    if (listExists) {
      alert('Esiste già una lista con lo stesso nome.');
      return;
    }

    // Recupera la lista esistente dal database
    const existingList = await db.getToDoList(this.list!.id ?? -1);
    if (!existingList) {
      alert('La lista non esiste.');
      return;
    }

    // Modifica i valori di title e description della lista esistente
    existingList.title = this.listName;
    existingList.description = this.listDescription;

    // Salva la lista modificata nel database
    await db.updateTodoList(existingList);

    this.reloadService.reloadLists();
    this.listName = '';
    this.listDescription = '';
    this.hide();
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
}