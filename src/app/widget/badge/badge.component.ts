import { Component, Input, OnInit } from '@angular/core';
import { TodoList } from '../../models/list_model';
import { db } from '../../services/database';
import { ReloadService } from '../../services/reload_service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() list: TodoList | undefined;
  itemNumber: number | undefined;
  checkedItemNumber: number | undefined;
  uncheckedItemNumber: number | undefined;

  constructor(private reloadService: ReloadService) { }

  async ngOnInit() {
    this.itemNumber = await db.countTodoItems(this.list);
    this.checkedItemNumber = await db.countDoneTodoItems(this.list);
    this.uncheckedItemNumber = await db.countUndoneTodoItems(this.list);

    this.reloadService.reloadList$.subscribe(() => {
      this.updateItemCount();
    });
  }

  async updateItemCount() {
    this.itemNumber = await db.countTodoItems(this.list);
    this.checkedItemNumber = await db.countDoneTodoItems(this.list);
    this.uncheckedItemNumber = await db.countUndoneTodoItems(this.list);
  }
}
