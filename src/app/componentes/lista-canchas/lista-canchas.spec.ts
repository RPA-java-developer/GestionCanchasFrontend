import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCanchas } from './lista-canchas';

describe('ListaCanchas', () => {
  let component: ListaCanchas;
  let fixture: ComponentFixture<ListaCanchas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCanchas],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCanchas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
