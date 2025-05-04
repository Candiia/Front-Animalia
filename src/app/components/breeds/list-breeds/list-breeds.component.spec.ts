import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBreedsComponent } from './list-breeds.component';

describe('ListBreedsComponent', () => {
  let component: ListBreedsComponent;
  let fixture: ComponentFixture<ListBreedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBreedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
