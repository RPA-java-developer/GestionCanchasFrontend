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

  items: string[] = [];

  listaTipo:string[]=["fútbol","básquet","tenis", "voleibol", "multiusos"];
  seleccionadoTipo:string;


  // Access each distinct component instance directly
  @ViewChild('startDatePicker') startDatePicker!: NgxsmkDatepickerComponent;
  @ViewChild('endDatePicker') shippingPicker!: NgxsmkDatepickerComponent;

  minimumDate1: Date = new Date();  // Locks selection to today and future dates
  // Estado con Signal para la fecha y hora seleccionada
  selectedDateTime1 = signal<Date | null>(new Date());

  minimumDate2: Date = new Date();
  selectedDateTime2 = signal<Date | null>(new Date());



 fechaApertura: Date;
 fechaCierre: Date;


    // Define a reactive signal to hold the input state
  protected textInput = signal<string>('');


  constructor(private canchaServicio:CanchaService, private router:Router, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.obtenerNombresDeCanchas();

  }


  private obtenerNombresDeCanchas() {
    this.canchaServicio.obtenerNombresDeCanchas().subscribe(dato => {
      console.log(dato);
      this.items = dato;
      //this.cdr.detectChanges();
    })
  };


  // Mock data source
  /*
  private items = [
    'Angular',
    'React',
    'Vue',
    'Svelte',
    'Next.js',
    'Nuxt.js',
    'SolidJS',
    'Qwik'
  ];
*/
  // Component state using signals
  query = signal<string>('');
  isDropdownOpen = signal<boolean>(false);

  // Computed signal to handle the live filtering logic
  filteredItems = computed(() => {
    const currentQuery = this.query().toLowerCase().trim();
    if (!currentQuery) {
      return this.items;
    }
    return this.items.filter(item => item.toLowerCase().includes(currentQuery));
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

    validarFechas(_fecha1: number, _fecha2: number): void {

    }

  /*
  validarFechas(_fecha1: string, _fecha2: string): void {

    console.log('Fecha 1:', _fecha1);
    console.log('Fecha 2:', _fecha2);

    const isoString1 = _fecha1;
    const [dayPart1, timePart1] = isoString1.split("T");
    console.log(dayPart1);
    console.log(timePart1);

    const isoString2 = _fecha2;
    const [dayPart2, timePart2] = isoString2.split("T");
    console.log(dayPart2);
    console.log(timePart2);

    if (dayPart2 > dayPart1) {
      console.log('Fechas VALIDAS MAYOR');
      this.fechasError = false;
      this.horasError = false;
    } else {
      if (dayPart2 == dayPart1) {
          console.log('Fechas IGUALES');
          this.fechasError = false;
          if (timePart2 > timePart1) {
             console.log('Horas VALIDAS');
             this.horasError = false;
          } else {
             console.log('Horas INVALIDAS');
             this.horasError = true;
          }
      } else {
        console.log('Fechas INVALIDAS');
        this.fechasError = true;
      }
    }
  }
 */

  validarCapacidad(_capacidad: number): void {
    console.log('Capacidad: ', _capacidad);
    //const texto: string = "42";
    //const entero: number = parseInt(_capacidad, 10);

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
    this.fechasError = false;
    this.capacidadError = false;

    if (formulario.valid) {
      console.log('Formulario a validar 1', formulario.value);

      for (const [clave, valor] of Object.entries(formulario.value)) {
        //console.log(`${clave}: ${valor}`);
        if (`${clave}` === 'nombre') {
          console.log('Nombre ---> si ', `${valor}`);
          for (const item of this.items) {
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
              console.log(this.cancha.apertura);
              console.log(this.cancha.cierre);

              /*
              this.fechaApertura = new Date(this.cancha.apertura  ?? "");
              //console.log('fechaApertura ', this.fechaApertura);
              const yearA = this.fechaApertura.getFullYear();
              const monthA = String(this.fechaApertura.getMonth() + 1).padStart(2, '0');
              const dayA = String(this.fechaApertura.getDate()).padStart(2, '0');
              const hoursA = String(this.fechaApertura.getHours()).padStart(2, '0');
              const minutesA = String(this.fechaApertura.getMinutes()).padStart(2, '0');
              const secondsA = String(this.fechaApertura.getSeconds()).padStart(2, '0');
              const formattedA = `${yearA}-${monthA}-${dayA}T${hoursA}:${minutesA}:${secondsA}`;
              //console.log('formatted ', formattedA);
              this.cancha.apertura = formattedA;
              */
              /*
              this.fechaCierre = new Date(this.cancha.cierre  ?? "");
              //console.log('fechaCierre ', this.fechaCierre);
              const yearC = this.fechaCierre.getFullYear();
              const monthC = String(this.fechaCierre.getMonth() + 1).padStart(2, '0');
              const dayC = String(this.fechaCierre.getDate()).padStart(2, '0');
              const hoursC = String(this.fechaCierre.getHours()).padStart(2, '0');
              const minutesC = String(this.fechaCierre.getMinutes()).padStart(2, '0');
              const secondsC = String(this.fechaCierre.getSeconds()).padStart(2, '0');
              const formattedC = `${yearC}-${monthC}-${dayC}T${hoursC}:${minutesC}:${secondsC}`;
             // console.log('formatted ', formattedC);
              this.cancha.cierre = formattedC;
              */

             console.log('a ',this.cancha.apertura);
             console.log('b ',this.cancha.cierre);

              this.registrarCancha();
           } else {
              console.log('**** ',this.nombreRepetido);

              this.cdr.markForCheck();
              console.log(this.cancha.apertura);
              console.log(this.cancha.cierre);

              /*
              this.fechaApertura = new Date(this.cancha.apertura  ?? "");
              //console.log('fechaApertura ', this.fechaApertura);
              const yearA = this.fechaApertura.getFullYear();
              const monthA = String(this.fechaApertura.getMonth() + 1).padStart(2, '0');
              const dayA = String(this.fechaApertura.getDate()).padStart(2, '0');
              const hoursA = String(this.fechaApertura.getHours()).padStart(2, '0');
              const minutesA = String(this.fechaApertura.getMinutes()).padStart(2, '0');
              const secondsA = String(this.fechaApertura.getSeconds()).padStart(2, '0');
              const formattedA = `${yearA}-${monthA}-${dayA}T${hoursA}:${minutesA}:${secondsA}`;
              //console.log('formatted ', formattedA);
              this.cancha.apertura = formattedA;


              this.fechaCierre = new Date(this.cancha.cierre  ?? "");
              //console.log('fechaCierre ', this.fechaCierre);
              const yearC = this.fechaCierre.getFullYear();
              const monthC = String(this.fechaCierre.getMonth() + 1).padStart(2, '0');
              const dayC = String(this.fechaCierre.getDate()).padStart(2, '0');
              const hoursC = String(this.fechaCierre.getHours()).padStart(2, '0');
              const minutesC = String(this.fechaCierre.getMinutes()).padStart(2, '0');
              const secondsC = String(this.fechaCierre.getSeconds()).padStart(2, '0');
              const formattedC = `${yearC}-${monthC}-${dayC}T${hoursC}:${minutesC}:${secondsC}`;
             // console.log('formatted ', formattedC);
              this.cancha.cierre = formattedC;
              */

             console.log('a ',this.cancha.apertura);
             console.log('b ',this.cancha.cierre);

             this.validarFechas(this.cancha.apertura, this.cancha.cierre);

             console.log('FECHAS ***: ', this.fechasError);
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
      console.log('Formulario INVALIDO 1', formulario.value);
    }

  }


}
