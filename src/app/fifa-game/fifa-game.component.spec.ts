import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifaGameComponent } from './fifa-game.component';

describe('FifaGameComponent', () => {
  let component: FifaGameComponent;
  let fixture: ComponentFixture<FifaGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FifaGameComponent]
    });
    fixture = TestBed.createComponent(FifaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
