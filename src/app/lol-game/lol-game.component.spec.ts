import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolGameComponent } from './lol-game.component';

describe('LolGameComponent', () => {
  let component: LolGameComponent;
  let fixture: ComponentFixture<LolGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LolGameComponent]
    });
    fixture = TestBed.createComponent(LolGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
