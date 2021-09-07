import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabslistComponent } from './labslist.component';

describe('LabslistComponent', () => {
  let component: LabslistComponent;
  let fixture: ComponentFixture<LabslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
