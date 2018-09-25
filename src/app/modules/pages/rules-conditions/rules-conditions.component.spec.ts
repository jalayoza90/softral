import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesConditionsComponent } from './rules-conditions.component';

describe('RulesConditionsComponent', () => {
  let component: RulesConditionsComponent;
  let fixture: ComponentFixture<RulesConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
