import { Component, Input, EventEmitter, Output } from '@angular/core';
import { db } from '../../services/database';
import { ReloadService } from '../../services/reload_service';

@Component({
  selector: 'app-new-to-do-item-form',
  templateUrl: './new-to-do-item-form.component.html',
  styleUrls: ['./new-to-do-item-form.component.scss']
})
export class NewToDoItemFormComponent {
  @Input() ToDoListId: number | undefined;
  @Output() onItemAdd = new EventEmitter<void>();
  itemName: string = '';

  constructor(private reloadService: ReloadService) { }


  addToDoItem() {
    db.addTodoItem({
      title: this.itemName,
      todoListId: this.ToDoListId ?? -1,
      done: false,
    });
    this.reloadService.reloadLists();
    this.onItemAdd.emit();
    this.itemName = '';
  }
}
