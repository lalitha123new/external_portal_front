import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AupreviewComponent } from './aupreview.component';

describe('AupreviewComponent', () => {
  let component: AupreviewComponent;
  let fixture: ComponentFixture<AupreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AupreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AupreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
