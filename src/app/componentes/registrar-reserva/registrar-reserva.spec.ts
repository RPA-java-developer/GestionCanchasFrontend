import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarReserva } from './registrar-reserva';

describe('RegistrarReserva', () => {
  let component: RegistrarReserva;
  let fixture: ComponentFixture<RegistrarReserva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarReserva],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarReserva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
