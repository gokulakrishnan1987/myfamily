import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFamilyDialogComponent } from './add-family-dialog.component';

describe('AddFamilyDialogComponent', () => {
  let component: AddFamilyDialogComponent;
  let fixture: ComponentFixture<AddFamilyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFamilyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFamilyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
