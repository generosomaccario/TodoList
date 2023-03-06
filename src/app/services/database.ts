import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { TodoItem } from '../models/item_model';
import { TodoList } from '../models/list_model';

@Injectable({
    providedIn: 'root'
})

export class ToDoDB extends Dexie {
    todoLists!: Table<TodoList, number>;
    todoItems!: Table<TodoItem, number>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(3).stores({
            todoLists: '++id',
            todoItems: '++id, todoListId',
        });
    }

    // Get

    async getToDoList(id: number): Promise<TodoList | undefined> {
        return await this.todoLists.get(id);
    }


    async getAllToDoList(): Promise<TodoList[]> {
        return await this.todoLists.toArray();
    }

    async getToDoItem(itemId: number): Promise<TodoItem | undefined> {
        return await this.todoItems.get(itemId);
    }


    async getAllToDoItemByListId(id: number): Promise<TodoItem[]> {
        return await this.todoItems.where('todoListId').equals(id).toArray();
    }

    async countTodoItems(list: TodoList | undefined): Promise<number> {
        const items = await db.getAllToDoItemByListId(list?.id ?? -1);
        return items.length;
    }

    async countDoneTodoItems(list: TodoList | undefined): Promise<number> {
        const items = await this.getAllToDoItemByListId(list?.id ?? -1);
        return items.filter(item => item.done).length;
    }

    async countUndoneTodoItems(list: TodoList | undefined): Promise<number> {
        const items = await this.getAllToDoItemByListId(list?.id ?? -1);
        return items.filter(item => !item.done).length;
    }

    // Add

    async addTodoList(list: TodoList): Promise<number> {
        return await this.todoLists.add(list);

    }

    async addTodoItem(item: TodoItem): Promise<number> {
        return await this.todoItems.add(item);
    }


    // Remove

    async removeTodoList(id: number): Promise<void> {
        // Elimina la lista
        await this.todoLists.delete(id);
        // Recupera tutti gli elementi associati alla lista
        const items = await this.getAllToDoItemByListId(id);
        // Elimina gli elementi
        for (const item of items) {
            await this.removeTodoItem(item.id ?? -1);
        }
    }


    async removeTodoItem(id: number): Promise<void> {
        await this.todoItems.delete(id);
    }


    // Update

    async updateToDoItem(item: TodoItem): Promise<void> {
        await this.todoItems.update(item.id ?? -1, item);
    }


    async toggleDoneToDoItem(itemId: number): Promise<void> {
        const item = await this.getToDoItem(itemId);
        item!.done = !item!.done;
        await this.updateToDoItem(item!);
    }

    async updateTodoList(list: TodoList): Promise<void> {
        await db.todoLists.update(list.id ?? -1, list);
    }

}

export const db = new ToDoDB();