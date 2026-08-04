import { Routes } from '@angular/router';

import { ListaCanchas } from './componentes/lista-canchas/lista-canchas';
import { RegistrarCancha } from './componentes/registrar-cancha/registrar-cancha';
import { ListaReservas } from './componentes/lista-reservas/lista-reservas';
import { RegistrarReserva } from './componentes/registrar-reserva/registrar-reserva';
import { ReportesPage } from './componentes/reportes/reportes-page/reportes-page';



export const routes: Routes = [

  { path: 'canchas', component: ListaCanchas },
  { path: '', redirectTo:'canchas', pathMatch:'full' },
  { path: 'registrar-cancha', component: RegistrarCancha },
  { path: 'reservas', component: ListaReservas },
  { path: 'registrar-reserva', component: RegistrarReserva },
  { path: 'reportes',  component: ReportesPage }

];
