import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../servicios/reserva-service';
import { Reserva } from '../../entidades/reserva';
import { Router } from '@angular/router';
import { NgxsmkDatepickerComponent } from "ngxsmk-datepicker";
import { Cancha } from '../../entidades/cancha';


@Component({
  selector: 'app-registrar-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, NgxsmkDatepickerComponent],
  templateUrl: './registrar-reserva.html',
  styleUrl: './registrar-reserva.css',
})
export class RegistrarReserva implements OnInit {

  reserva:Reserva = new Reserva();

  minimumDate: Date = new Date();
  selectedDate = signal<Date | null>(new Date());
  fechaReserva: Date;

  lista:Cancha[]=[];
  identificadorCancha: string;
  itemSeleccionado:string;

  miFormulario: FormGroup;

  constructor(private fb: FormBuilder, private reservaServicio:ReservaService, private router:Router) {
    this.miFormulario = this.fb.group({
      //idReserva:          ['', [Validators.required]],
      idCancha:           ['', [Validators.required]],
      idUsuario:          ['', [Validators.required]],
      fechaReserva:       ['', [Validators.required]],
      horaInicioReserva:  ['', [Validators.required]],
      tiempoReservado:    ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

        this.lista = [
          {
            "id": 1,
            "nombre": "Cancha Central",
            "tipo": "Fútbol",
            "capacidad": 10,
            "apertura": "2026-06-06T15:30",
            "cierre": "2026-06-06T15:30",
            tarifa: 15.00
          },
          {
            "id": 2,
            "nombre": "Cancha Norte",
            "tipo": "Básquet",
            "capacidad": 10,
            "apertura": "2026-06-06T15:30",
            "cierre": "2026-06-06T15:30",
            tarifa: 15.00
          },
          {
            "id": 3,
            "nombre": "Cancha Sur",
            "tipo": "Tenis",
            "capacidad": 10,
            "apertura": "2026-06-06T15:30",
            "cierre": "2026-06-06T15:30",
            tarifa: 15.00
          },
          {
            "id": 4,
            "nombre": "Multiusos Este",
            "tipo": "Multiusos",
            "capacidad": 10,
            "apertura": "2026-06-06T15:30",
            "cierre": "2026-06-06T15:30",
            tarifa: 15.00
          }
        ];

  }


  registrarReserva() {
    this.reserva.idCancha = this.miFormulario.controls['idCancha'].value;
    this.reserva.idUsuario = this.miFormulario.controls['idUsuario'].value;
    this.reserva.fechaReserva = this.miFormulario.controls['fechaReserva'].value;
    this.reserva.horaInicioReserva = this.miFormulario.controls['horaInicioReserva'].value;
    this.reserva.tiempoReservado = this.miFormulario.controls['tiempoReservado'].value;

    //console.log(this.reserva.fechaReserva);
    this.fechaReserva = new Date(this.reserva.fechaReserva ?? "");
    const yearA = this.fechaReserva.getFullYear();
    const monthA = String(this.fechaReserva.getMonth() + 1).padStart(2, '0');
    const dayA = String(this.fechaReserva.getDate()).padStart(2, '0');
    const formattedFR = `${yearA}-${monthA}-${dayA}`;
    this.reserva.fechaReserva = formattedFR;

    console.log('Entidad: ',this.reserva.idCancha);
    console.log('Entidad: ',this.reserva.idUsuario);
    console.log('Entidad: ',this.reserva.fechaReserva);
    console.log('Entidad: ',this.reserva.horaInicioReserva);
    console.log('Entidad: ',this.reserva.tiempoReservado);

    this.reservaServicio.registrarReserva(this.reserva).subscribe(
      {
        next: (dato) => {
          console.log(dato),
          this.irAlaListaDeReservas()
        },
          error: (e) => console.error(e),
          complete: () => console.info('complete')

      });
  }


  irAlaListaDeReservas() {
    this.router.navigate(['/reservas']);
  }


  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.registrarReserva();
  }

}
