import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../entidades/reserva';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../entidades/DTO/usuario-dto';
import { ReproteUnoDto } from '../entidades/DTO/reporteUno-dto';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  constructor(private httpClient : HttpClient) { }

      // Esta URL genera el listado de todos los customer en el backeng
  private baseURL = "http://localhost:8080/api/v1/reservas";
  private baseURL2 = "http://localhost:8080/api/v1/usuarios";
  private baseURL3 = "http://localhost:8080/api/v1/reservasxcanchaxfecha";

  // Este metodo obtiene la lista de Reservas
  obtenerListaDeReservas():Observable<Reserva[]>{
    return this.httpClient.get<Reserva[]>(`${this.baseURL}`);
  }

  // Este método sirve para registrar una Reserva
  registrarReserva(reservaObjeto:Reserva) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, reservaObjeto)
  }

  // Este metodo obtiene la lista de Canchas
  consultarUsuarioReserva():Observable<UsuarioDto>{
    return this.httpClient.get<UsuarioDto>(`${this.baseURL2}`);
  }

  eliminarReserva(id:number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  consultarReporteUno(_fechaInicio: string, _fechaFin: string):Observable<ReproteUnoDto[]>{
    return this.httpClient.get<ReproteUnoDto[]>(`${this.baseURL3}?fechaInicio=${_fechaInicio}&fechaFin=${_fechaFin}`);
  }

}
