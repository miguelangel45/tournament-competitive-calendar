import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaloGameComponent } from './halo-game.component';

describe('HaloGameComponent', () => {
  let component: HaloGameComponent;
  let fixture: ComponentFixture<HaloGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HaloGameComponent]
    });
    fixture = TestBed.createComponent(HaloGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
