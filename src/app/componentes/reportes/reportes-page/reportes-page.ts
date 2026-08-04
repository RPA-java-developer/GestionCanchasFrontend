import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { ReservaService } from '../../../servicios/reserva-service';
import { ReproteUnoDto } from '../../../entidades/DTO/reporteUno-dto';


interface ReportItem {
  id: number;
  name: string;
  amount: number;
  date: string;
}


@Component({
  selector: 'app-reportes-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes-page.html',
  styleUrl: './reportes-page.css',
})
export class ReportesPage implements OnInit {

  //reporteUnoDto:ReproteUnoDto[]=[];

  private reporteUnoDto = signal<ReproteUnoDto[]>([]);

  // Filtro activo
  private filterUno = signal<'todos' | 'igual'>('todos');




  constructor(private reservaServicio:ReservaService, ){}


  ngOnInit(): void {
    this.obtenerReporteUno();
  }


  private obtenerReporteUno() {
    this.reservaServicio.consultarReporteUno('2026-07-31', '2026-08-20').subscribe(
      {
        next: (dato) => {
          console.log('dato: ',dato);
          this.reporteUnoDto.set(dato);
        },
        error: (error) => {
          console.error('Ocurrió un error:', error);
        },
        complete: () => {
            console.info('complete');
            //console.log(this.reporteUnoDto);
        }
      });
  };





  // Señal computada para filtrar elementos dinámicamente
  filtroReportes = computed(() => {

    const currentFiltro = this.filterUno();

    const texto = this.filterUno().toLowerCase();
    const itemsUno = this.reporteUnoDto();
    if (currentFiltro === 'igual') {

      return this.reporteUnoDto().filter(
        //reserva => reserva.totalReservas >= 5
        //reserva => reserva.totalTiempoReservas >= 4
        //reserva => reserva.tarifa >= 24
          reserva => reserva.idCancha == 2
      )
    }
    return itemsUno;

  });


  // Señales computadas para métricas
  totalRegistros = computed(() => this.filtroReportes().length);
  totalReservas = computed(() => this.filtroReportes().reduce((acc, curr) => acc + curr.totalReservas, 0));
  totalHorasReservadas = computed(() => this.filtroReportes().reduce((acc, curr) => acc + curr.totalTiempoReservas, 0));
  //totalReservas = computed(() => this.filtroReportes().reduce((acc, curr) => acc + curr.totalReservas, 0));


  filterDatos(typeUno: 'todos' | 'igual') {
    this.filterUno.set(typeUno);
  }




}
