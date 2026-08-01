import { Component, OnInit, signal } from '@angular/core';
import { Cancha } from '../../entidades/cancha';
import { CanchaService } from '../../servicios/cancha.service';
import { NgFor } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-lista-canchas',
  standalone: true,
  //imports:  [JsonPipe],
  imports:  [],
  templateUrl: './lista-canchas.html',
  styleUrl: './lista-canchas.css',
})
export class ListaCanchas implements OnInit {

  //canchas: Cancha[] = [];
  canchas = signal<Cancha[]>([]);


  constructor(private canchaServicio:CanchaService, private cdr: ChangeDetectorRef) {

  }


  ngOnInit(): void {
        /*
        this.canchas = [
          {
            "id": 1,
            "nombre": "Cancha Central",
            "tipo": "Tenis",
            "capacidad": 10,
            "apertura": new Date("2026-06-06T15:30"),
            "cierre": new Date("2026-06-06T15:30"),
            tarifa: 15.00,
          },
          {
            "id": 2,
            "nombre": "Cancha Sur",
            "tipo": "Fútbol",
            "capacidad": 22,
            "apertura": new Date("2026-06-06T09:30"),
            "cierre": new Date("2026-06-06T09:40"),
            tarifa: 20.00,
          }
        ];
        */

      this.obtenerCanchas();

  }


  private obtenerCanchas() {
    this.canchaServicio.obtenerListaDeCanchas().subscribe(dato => {
      console.log(dato);
      this.canchas.set(dato);
      //this.cdr.detectChanges();
    })
  };


}
