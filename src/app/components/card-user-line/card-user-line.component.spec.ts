import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserLineComponent } from './card-user-line.component';

describe('CardUserLineComponent', () => {
  let component: CardUserLineComponent;
  let fixture: ComponentFixture<CardUserLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardUserLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUserLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
