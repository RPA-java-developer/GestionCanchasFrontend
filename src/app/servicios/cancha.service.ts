import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cancha } from '../entidades/cancha';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CanchaService {

    constructor(private httpClient : HttpClient) { }

  // Esta URL genera el listado de todos los customer en el backeng
  private baseURL = "http://localhost:8080/api/v1/canchas";
  private baseURL2 = "http://localhost:8080/api/v1/listanombrecancha";

  // Este metodo obtiene la lista de Canchas
  obtenerListaDeCanchas():Observable<Cancha[]>{
    return this.httpClient.get<Cancha[]>(`${this.baseURL}`);
  }


  // Este método sirve para registrar una Cancha
  registrarCancha(canchaObjeto:Cancha) : Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, canchaObjeto)
  }


  // Este metodo obtiene la lista de Canchas
  obtenerNombresDeCanchas():Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.baseURL2}`);
  }

}
