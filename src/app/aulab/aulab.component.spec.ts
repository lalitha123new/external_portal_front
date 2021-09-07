import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulabComponent } from './aulab.component';

describe('AulabComponent', () => {
  let component: AulabComponent;
  let fixture: ComponentFixture<AulabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
