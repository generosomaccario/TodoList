import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReloadService {
    private reloadList = new Subject<any>();

    reloadList$ = this.reloadList.asObservable();

    reloadLists() {
        this.reloadList.next('reload');
    }
}
