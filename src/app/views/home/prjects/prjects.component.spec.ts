import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjectsComponent } from './prjects.component';

describe('PrjectsComponent', () => {
  let component: PrjectsComponent;
  let fixture: ComponentFixture<PrjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrjectsComponent]
    });
    fixture = TestBed.createComponent(PrjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
