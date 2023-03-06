import { Component, Input, SimpleChanges } from '@angular/core';
import { TodoItem } from '../../../models/item_model';
import { TodoList } from '../../../models/list_model';
import { db } from '../../../services/database';
import { ReloadService } from '../../../services/reload_service';

@Component({
  selector: 'app-to-do-item-list',
  templateUrl: './to-do-item-list.component.html',
  styleUrls: ['./to-do-item-list.component.scss']
})
export class ToDoItemListComponent {
  @Input() ReceivedListId?: number;
  todoItems: TodoItem[] = [];
  todoList: TodoList | undefined;

  ngOnInit() {
    this.loadItems();
  }


  constructor(private reloadService: ReloadService) {
    this.reloadService.reloadList$.subscribe(() => {
      this.loadItems();
    })
    this.loadItems();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['ReceivedListId']) {
      await this.loadItems();
    }
  }

  public async loadItems() {
    db.getToDoList(this.ReceivedListId ?? -1).then(list => this.todoList = list);
    this.todoItems = await db.getAllToDoItemByListId(this.ReceivedListId ?? -1);
  }

  removeItem(id?: number) {
    db.removeTodoItem(id ?? -1);
    this.loadItems();
    this.reloadService.reloadLists();
  }

  onItemAdd() {
    this.loadItems();
  }

  changeValue(id?: number) {
    db.toggleDoneToDoItem(id ?? -1).then(() => {
      this.reloadService.reloadLists();
    });
  }

}
