import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulabsampleComponent } from './aulabsample.component';


describe('AulabsampleComponent', () => {
  let component: AulabsampleComponent;
  let fixture: ComponentFixture<AulabsampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulabsampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulabsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
