import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../entidades/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  constructor(private httpClient : HttpClient) { }

      // Esta URL genera el listado de todos los customer en el backeng
  private baseURL = "http://localhost:8080/api/v1/reservas";

  // Este metodo obtiene la lista de Reservas
  obtenerListaDeReservas():Observable<Reserva[]>{
    return this.httpClient.get<Reserva[]>(`${this.baseURL}`);
  }

  // Este método sirve para registrar una Reserva
  registrarReserva(reservaObjeto:Reserva) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, reservaObjeto)
  }



}
