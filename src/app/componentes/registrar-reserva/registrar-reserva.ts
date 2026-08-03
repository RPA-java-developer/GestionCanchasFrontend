import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../servicios/reserva-service';
import { Reserva } from '../../entidades/reserva';
import { Router } from '@angular/router';
import { NgxsmkDatepickerComponent } from "ngxsmk-datepicker";
import { Cancha } from '../../entidades/cancha';
import { CanchaService } from '../../servicios/cancha.service';
import { CanchaDisponibilidadDto } from '../../entidades/DTO/cancha-disponibilidad-dto';
import { UsuarioDto } from '../../entidades/DTO/usuario-dto';


@Component({
  selector: 'app-registrar-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, NgxsmkDatepickerComponent, FormsModule],
  templateUrl: './registrar-reserva.html',
  styleUrl: './registrar-reserva.css',
})
export class RegistrarReserva implements OnInit {

  reserva:Reserva = new Reserva();

  minimumDate: Date = new Date();
  selectedDate = signal<Date | null>(new Date());
  fechaReserva: string;

  selectedDate1: string;
  selectedDate2: string | Date = '';

  controlCancha = false;
  controlFecha = false;
  controlUsuario = false;

  disponibilidadControl: number;
  aperturaControl: number;
  cierreControl: number;
  isVisible: boolean = true;
  isButtonDisabled: boolean = true;

  valorSeleccionado: number;

  idCanchaX:number;
  fechaReservaX:string;

  vector: number[] = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  canchaDisponibilidad: CanchaDisponibilidadDto;
  usuarioDto:UsuarioDto;
  usuarioSelect:UsuarioDto;
  usuarioID:number;
  listaUser:UsuarioDto[]=[];


  lista:Cancha[]=[];
  identificadorCancha: string;
  itemSeleccionado:string;

  paso: number = 1;
  miFormulario: FormGroup;

  constructor(private fb: FormBuilder, private reservaServicio:ReservaService, private canchaServicio:CanchaService, private router:Router) {
    this.miFormulario = this.fb.group({
      // Paso 1: Datos de consulta Cancha
      idCancha:           ['', [Validators.required]],
      fechaReserva:       ['', [Validators.required]],
      // Paso 2: Usuario y tiempo
      tiempoDisponibilidad:['', [Validators.required]],
      idUsuario:          ['', [Validators.required]],
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
            "capacidad": 22,
            "apertura": 6,
            "cierre": 22,
            tarifa: 20.00
          },
          {
            "id": 2,
            "nombre": "Cancha Norte",
            "tipo": "Básquet",
            "capacidad": 10,
            "apertura": 7,
            "cierre":  21,
            tarifa: 15.00
          },
          {
            "id": 3,
            "nombre": "Cancha Sur",
            "tipo": "Tenis",
            "capacidad": 4,
            "apertura": 8,
            "cierre":  20,
            tarifa: 25.00
          },
          {
            "id": 4,
            "nombre": "Multiusos Este",
            "tipo": "Multiusos",
            "capacidad": 16,
            "apertura": 6,
            "cierre":  22,
            tarifa: 15.00
          }
        ];

        this.listaUser = [
          {
            "idUsuario": 1,
            "nombreUsuario": "Juan Pérez",
            "identificacionUsuario": "12345678",
            "tipoUsuario": "MIEMBRO",
          },
          {
            "idUsuario": 2,
            "nombreUsuario": "María García",
            "identificacionUsuario": "55555555",
            "tipoUsuario": "MIEMBRO",
          },
          {
            "idUsuario": 3,
            "nombreUsuario": "Carlos López",
            "identificacionUsuario": "22446688",
            "tipoUsuario": "MIEMBRO",
          }
        ];
  }




  siguiente() {
    console.log('YYY ', this.canchaDisponibilidad);
    this.disponibilidadControl = this.canchaDisponibilidad.disponibilidad;
    this.aperturaControl = this.canchaDisponibilidad.apertura;
    this.cierreControl = this.canchaDisponibilidad.cierre;
    this.paso++;
  }

  anterior() {
    this.paso--;
      this.controlCancha = false;
      this.controlFecha = false;
      this.isVisible = true;
      this.isButtonDisabled=true;
  }


  onUsuarioChange(userIDvalue:UsuarioDto): void {

    console.log('Selected UserID:', userIDvalue);
    this.miFormulario.controls['idUsuario']?.setValue(userIDvalue);

  }

  consultarUsuarioReserva(): void {
    this.reservaServicio.consultarUsuarioReserva().subscribe(
      {
        next: (dato) => {
          console.log('dato: ',dato),
          this.usuarioDto = dato;
        },
        error: (error) => {
          console.error('Ocurrió un error:', error);
        },
        complete: () => {
            console.info('complete');
        }
      });
  }


  consultarDisponibilidad( _idCancha: number, _fechaDisponibilidad: string): void {

    if (!this.selectedDate1 && !this.valorSeleccionado) {
      console.log("consultar... 0")
      this.controlCancha = true;
      this.controlFecha = true;
      return; // No avanza si el paso 1 es inválido
    }
    if (!this.valorSeleccionado) {
      console.log("consultar...1")
      this.miFormulario.get('idCancha')?.markAllAsTouched();
      this.controlFecha = false;
      return; // No avanza si el paso 1 es inválido
    }
    if (!this.selectedDate1) {
      console.log("consultar... 2")
      this.controlCancha = false;
      return; // No avanza si el paso 1 es inválido
    }
      this.controlCancha = false;
      this.controlFecha = false;

    console.log('canchaD: ', _idCancha);
    console.log('fechaD: ', _fechaDisponibilidad);
    this.miFormulario.controls['idCancha']?.setValue(_idCancha);

    this.canchaServicio.consultarDisponibilidadCancha(_idCancha, _fechaDisponibilidad).subscribe(
      {
        next: (dato) => {
          console.log('dato: ',dato),
          this.canchaDisponibilidad = dato;
        },
        error: (error) => {
          console.error('Ocurrió un error:', error);
        },
        complete: () => {
            console.info('complete');
        }
      });
      this.isVisible = false;
      this.isButtonDisabled=false;
  }



  onDateChange(value: any) {
    if (!value) return;
    const dateObj = new Date(value);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    this.selectedDate2 = `${year}-${month}-${day}`;
    this.selectedDate1 = this.selectedDate2;
  }



  registrarReserva() {
    this.reserva.idCancha = this.miFormulario.controls['idCancha'].value;
    this.reserva.idUsuario = this.miFormulario.controls['idUsuario'].value;
    this.reserva.fechaReserva = this.miFormulario.controls['fechaReserva'].value;
    this.reserva.tiempoDisponibilidad =this.miFormulario.controls['tiempoDisponibilidad'].value;
    this.reserva.horaInicioReserva = this.miFormulario.controls['horaInicioReserva'].value;
    this.reserva.tiempoReservado = this.miFormulario.controls['tiempoReservado'].value;

    console.log('Entidad: ',this.reserva.idCancha);
    console.log('Entidad: ',this.reserva.idUsuario);
    console.log('Entidad fecha: ',this.reserva.fechaReserva);
    console.log('Entidad dis: ',this.reserva.tiempoDisponibilidad);
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
    /*
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
      */
    console.log(this.usuarioID);
    console.log(this.reserva.idUsuario);

    console.log(this.miFormulario.value);
    this.miFormulario.controls['fechaReserva']?.setValue(this.selectedDate1);
    this.miFormulario.controls['tiempoDisponibilidad']?.setValue(this.disponibilidadControl);
    console.log(this.miFormulario.value);

    this.registrarReserva();
  }

}
