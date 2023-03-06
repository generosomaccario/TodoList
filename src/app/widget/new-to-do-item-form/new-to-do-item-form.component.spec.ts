import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewToDoItemFormComponent } from './new-to-do-item-form.component';

describe('NewToDoItemFormComponent', () => {
  let component: NewToDoItemFormComponent;
  let fixture: ComponentFixture<NewToDoItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewToDoItemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewToDoItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
