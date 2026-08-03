import { ChangeDetectorRef, Component, computed, inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Cancha } from '../../entidades/cancha';
import { signal } from '@angular/core';
import { CanchaService } from '../../servicios/cancha.service';
import { Router } from '@angular/router';
import { FormBuilder,  FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { JsonPipe } from '@angular/common';
import { NgxsmkDatepickerComponent, NgxsmkDatepickerModule } from 'ngxsmk-datepicker';
import { input, effect } from '@angular/core';

@Component({
  selector: 'app-registrar-cancha',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsmkDatepickerModule,
  ],

  templateUrl: './registrar-cancha.html',
  styleUrl: './registrar-cancha.css',
})
export class RegistrarCancha implements OnInit {


  cancha:Cancha = new Cancha();

  nombreRepetido: boolean = false;
  fechasError: boolean = false;
  horasError: boolean = false;
  capacidadError: boolean = false;
  tarifaError: boolean = false;

  canchasNombres: string[] = [];
  listaTipo:string[]=["fútbol","básquet","tenis", "voleibol", "multiusos"];
  seleccionadoTipo:string;

  horaApertura:string[]=["6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"];
  seleccionApertura:string;
  horaCierre:string[]=["6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22"];
  seleccionCierre:string;


    // Define a reactive signal to hold the input state
  protected textInput = signal<string>('');


  constructor(private canchaServicio:CanchaService, private router:Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.obtenerNombresDeCanchas();
  }


  private obtenerNombresDeCanchas() {
    this.canchaServicio.obtenerNombresDeCanchas().subscribe(dato => {
      console.log(dato);
      this.canchasNombres = dato;
    })
  };


  // Component state using signals
  query = signal<string>('');
  isDropdownOpen = signal<boolean>(false);


  // Computed signal to handle the live filtering logic
  filteredItems = computed(() => {
    const currentQuery = this.query().toLowerCase().trim();
    if (!currentQuery) {
      return this.canchasNombres;
    }
    return this.canchasNombres.filter(item => item.toLowerCase().includes(currentQuery));
  });

  // Handle user typing
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.query.set(inputElement.value);
    this.cancha.nombre = inputElement.value;
    this.isDropdownOpen.set(true);
  }

  // Close dropdown when input loses focus (with a short delay to allow clicks to register)
  onBlur(): void {
    setTimeout(() => {
      this.isDropdownOpen.set(false);
    }, 200);
  }

  // Open dropdown when the user clicks or focuses on the input field
  onFocus(): void {
    this.isDropdownOpen.set(true);
  }


  registrarCancha() {
    console.log('Antes--> ', this.nombreRepetido);
    this.canchaServicio.registrarCancha(this.cancha).subscribe(
      {
        next: (dato) => {
          console.log(dato),
          this.irAlaListaDeCanchas()
        },
          error: (e) => console.error(e),
          complete: () => console.info('complete')

      });
  }


  irAlaListaDeCanchas() {
    this.router.navigate(['/canchas']);
  }

  validarFechas(_hora1: number, _hora2: number): void {
    console.log('Hora 1:', _hora1);
    console.log('Hora 2:', _hora2);
    if (_hora2 > _hora1) {
      console.log('horas VALIDAS mayor');
      //this.fechasError = false;
      this.horasError = false;
    } else {
        console.log('Fechas INVALIDAS');
        this.horasError = true;
    }
  }


  validarCapacidad(_capacidad: number): void {
    console.log('Capacidad: ', _capacidad);
    if (_capacidad>0 && _capacidad<=50) {
      console.log('Capacidad VALIDA', _capacidad);
      this.capacidadError = false;
    } else {
      console.log('Capacidad INVALIDA', _capacidad);
      this.capacidadError = true;
    }
  }

  validarTarifa(_tarifa: number): void {
    console.log('Tarifa: ', _tarifa);
     if (_tarifa>=5) {
      console.log('Tarifa cumple valor minimo:', _tarifa);
      this.tarifaError = false;
     } else {
        console.log('Tarifa inferior al valor minimo:', _tarifa);
        this.tarifaError = true;
     }
  }


  onSubmit(formulario: any) {
    this.nombreRepetido = false;
    this.capacidadError = false;

    if (formulario.valid) {
      console.log('Formulario a validar', formulario.value);

      for (const [clave, valor] of Object.entries(formulario.value)) {
        if (`${clave}` === 'nombre') {
          console.log('Nombre ---> si ', `${valor}`);
          for (const item of this.canchasNombres) {
            console.log(item);
              if (`${valor}`.toLowerCase() === item.toLowerCase()) {
                console.log('Nombre ---> REPETIDO ', item.toLowerCase());
                this.nombreRepetido = true;
                console.log('Antes Repetido--> ', this.nombreRepetido);
              }
          }
           console.log(this.nombreRepetido);
           if (!this.nombreRepetido) {
              console.log("Nombre VALIDO");
              console.log('---- ',this.nombreRepetido);
              this.cdr.markForCheck();
              console.log('a ',this.cancha.apertura);
              console.log('b ',this.cancha.cierre);
              this.validarFechas(this.cancha.apertura, this.cancha.cierre);
              console.log('HORAS ***: ', this.horasError);
              this.cdr.markForCheck();
              console.log('tarifa ',this.cancha.capacidad);
              this.validarCapacidad(this.cancha.capacidad);
              console.log('CAPACIDAD ***: ', this.capacidadError);

              console.log('tarifa ',this.cancha.tarifa);
              this.validarTarifa(this.cancha.tarifa);
              console.log('TARIFA ***: ', this.tarifaError);

              this.router.navigate(['/registrar-cancha']);
              this.cdr.markForCheck();

              if (this.horasError || this.capacidadError || this.tarifaError) {
                console.log("ERRORES-----");
              } else {
                this.registrarCancha();
              }

           } else {
              console.log('**** ',this.nombreRepetido);
              this.cdr.markForCheck();
              console.log('a ',this.cancha.apertura);
              console.log('b ',this.cancha.cierre);
              this.validarFechas(this.cancha.apertura, this.cancha.cierre);
              console.log('HORAS ***: ', this.horasError);
              this.cdr.markForCheck();
              console.log('tarifa ',this.cancha.capacidad);
              this.validarCapacidad(this.cancha.capacidad);
              console.log('tarifa ',this.cancha.tarifa);
              this.validarTarifa(this.cancha.tarifa);
              this.router.navigate(['/registrar-cancha']);
              this.cdr.markForCheck();
           }

        } else {
          console.log('no hay NOMBRE--> ');
        }

      }
    } else {
      console.log('Formulario INVALIDO', formulario.value);
    }
  }


}
