import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemListComponent } from './to-do-item-list.component';

describe('ToDoItemListComponent', () => {
  let component: ToDoItemListComponent;
  let fixture: ComponentFixture<ToDoItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
