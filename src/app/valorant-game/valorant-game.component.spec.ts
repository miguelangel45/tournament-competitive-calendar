import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorantGameComponent } from './valorant-game.component';

describe('ValorantGameComponent', () => {
  let component: ValorantGameComponent;
  let fixture: ComponentFixture<ValorantGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValorantGameComponent]
    });
    fixture = TestBed.createComponent(ValorantGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
