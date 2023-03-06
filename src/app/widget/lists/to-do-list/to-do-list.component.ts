import { Component, ViewChild } from '@angular/core';
import { EditListModalComponent } from '../../modal/edit-list-modal/edit-list-modal.component';
import { TodoList } from '../../../models/list_model';
import { NewListModalComponent } from '../../modal/new-list-modal/new-list-modal.component';
import { db } from '../../../services/database';
import { ReloadService } from '../../../services/reload_service';
import { ToDoItemListComponent } from '../to-do-item-list/to-do-item-list.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {
  todoLists: TodoList[] = [];
  listId: number | undefined;
  items: number | undefined;
  selectedListId: number | undefined;
  list: TodoList = { id: 1, title: '', description: '' };
  selectedList: TodoList | undefined;
  showItemList = true;

  @ViewChild('appDialog') editModal: EditListModalComponent | undefined;

  showDialog(id?: number) {
    this.editModal!.show(id ?? -1);
  }

  onListEdit(editedList: TodoList) {
    this.list = editedList;
  }

  constructor(private reloadService: ReloadService) {
    this.reloadService.reloadList$.subscribe(() => {
      this.loadLists();
    })
    this.loadLists();
  }

  ngOnInit() {
    this.setList();
  }

  async setList() {
    this.todoLists = await db.getAllToDoList();
    if (this.todoLists.length > 0) {
      this.listId = this.todoLists[0].id;
      this.selectedListId = this.todoLists[0].id;
      this.reloadService.reloadLists();
    }
  }

  async loadLists() {
    this.todoLists = await db.getAllToDoList();
    if (this.todoLists.length < 1) {
      this.showItemList = false;
    }
  }


  removeList(id?: number) {
    db.removeTodoList(id ?? -1);
    this.loadLists();
    this.ngOnInit();
  }

  selectList(id: number | undefined) {
    this.selectedListId = id;
    this.listId = id;
    this.reloadService.reloadLists();
    this.showItemList = true;
  }
}

