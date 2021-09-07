import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Header7Component } from './header7.component';

describe('Header7Component', () => {
  let component: Header7Component;
  let fixture: ComponentFixture<Header7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Header7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Header7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
