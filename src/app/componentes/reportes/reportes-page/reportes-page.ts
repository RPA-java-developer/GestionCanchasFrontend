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

  reporteUnoDto:ReproteUnoDto[]=[];

  // Señal con los datos originales

  private reports = signal<ReportItem[]>([
    { id: 1, name: 'Reporte de Ventas Enero', amount: 450, date: '2026-01-15' },
    { id: 2, name: 'Reporte de Ventas Febrero', amount: 820, date: '2026-02-20' },
    { id: 3, name: 'Reporte de Soporte', amount: 150, date: '2026-03-10' },
    { id: 4, name: 'Reporte de Licencias', amount: 1200, date: '2026-04-05' }
  ]);



  // Filtro activo
  private filter = signal<'all' | 'high'>('all');



  constructor(private reservaServicio:ReservaService, ) {

  }


  ngOnInit(): void {
    this.obtenerReporteUno();
  }

  private obtenerReporteUno() {
    this.reservaServicio.consultarReporteUno('2026-07-31', '2026-08-20').subscribe(
      {
        next: (dato) => {
          console.log('dato: ',dato);
          this.reporteUnoDto = dato;
        },
        error: (error) => {
          console.error('Ocurrió un error:', error);
        },
        complete: () => {
            console.info('complete');
            console.log(this.reporteUnoDto);
        }
      });
  };


  // Señal computada para filtrar elementos dinámicamente
  filteredReports = computed(() => {
    const currentFilter = this.filter();
    const items = this.reports();
    //const items = this.reporteUnoDto;
    if (currentFilter === 'high') {
      return items.filter(i => i.amount > 500);
      //return items.filter(i => i.idCancha = 2);
    }
    return items;
  });

  // Señales computadas para métricas
  totalCount = computed(() => this.filteredReports().length);
  totalSum = computed(() => this.filteredReports().reduce((acc, curr) => acc + curr.amount, 0));

  filterData(type: 'all' | 'high') {
    this.filter.set(type);
  }














}
