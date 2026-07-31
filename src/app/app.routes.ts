import { Routes } from '@angular/router';

import { ListaCanchas } from './componentes/lista-canchas/lista-canchas';
import { RegistrarCancha } from './componentes/registrar-cancha/registrar-cancha';



export const routes: Routes = [

  { path: 'canchas', component: ListaCanchas },
  { path: '', redirectTo:'canchas', pathMatch:'full' },               // Ruta raíz
  { path: 'registrar-cancha', component: RegistrarCancha },       // Ruta con parámetro dinámico
 // { path: '**', component: NotFoundComponent }          // Ruta comodín para errores 404

];

