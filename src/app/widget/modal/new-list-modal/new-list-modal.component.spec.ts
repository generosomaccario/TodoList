import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListModalComponent } from './new-list-modal.component';

describe('ReusableModalComponent', () => {
  let component: NewListModalComponent;
  let fixture: ComponentFixture<NewListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewListModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NewListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
