import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationshipDialogComponent } from './add-relationship-dialog.component';

describe('AddRelationshipDialogComponent', () => {
  let component: AddRelationshipDialogComponent;
  let fixture: ComponentFixture<AddRelationshipDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelationshipDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRelationshipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
