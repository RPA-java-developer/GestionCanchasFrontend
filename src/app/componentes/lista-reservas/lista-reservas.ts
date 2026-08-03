import { Component, OnInit, signal } from '@angular/core';
import { Reserva } from '../../entidades/reserva';
import { ReservaService } from '../../servicios/reserva-service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-lista-reservas',
  imports: [],
  templateUrl: './lista-reservas.html',
  styleUrl: './lista-reservas.css',
})
export class ListaReservas implements OnInit {


  //reservas: Reserva[] = [];
  reservas = signal<Reserva[]>([]);

  constructor(private reservaServicio:ReservaService) {}

  ngOnInit(): void {
        /*
        this.reservas = [
          {
            "idReserva": 1,
            "idCancha": 1,
            "idUsuario": 1,
            "fechaReserva": "2026-06-06",
            "horaInicio": 5,
            "tiempoReservado": 2
          },
          {
            "idReserva": 2,
            "idCancha": 2,
            "idUsuario": 2,
            "fechaReserva": "2026-07-07",
            "horaInicio": 4,
            "tiempoReservado": 3
          }
        ]
        */
        this.obtenerReservas();
  }

  private obtenerReservas() {
    this.reservaServicio.obtenerListaDeReservas().subscribe(dato => {
      console.log(dato);
      //this.reservas = dato;
      this.reservas.set(dato);
      //this.cdr.detectChanges();
    })
  };


  eliminarReserva(id:number){
    (swal as any).fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar la Reservación",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , elimínala',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result: { value: any; }) => {
      if(result.value){
        this.reservaServicio.eliminarReserva(id).subscribe(dato => {
          console.log(dato);
          this.obtenerReservas();
          (swal as any).fire({
            title: 'Reservación eliminada',
            text: 'La Reserva ha sido eliminada con exito',
            icon: 'success'
          });
        })
      }
    })
  }


}
