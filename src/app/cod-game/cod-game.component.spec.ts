import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodGameComponent } from './cod-game.component';

describe('CodGameComponent', () => {
  let component: CodGameComponent;
  let fixture: ComponentFixture<CodGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodGameComponent]
    });
    fixture = TestBed.createComponent(CodGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
