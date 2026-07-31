import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCancha } from './registrar-cancha';

describe('RegistrarCancha', () => {
  let component: RegistrarCancha;
  let fixture: ComponentFixture<RegistrarCancha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCancha],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarCancha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
