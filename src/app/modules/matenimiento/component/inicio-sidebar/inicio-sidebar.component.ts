import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ProductoService } from '../../service/producto/producto.service';
import { ResponseProducto } from '../../models/producto/producto-response.model';

@Component({
  selector: 'app-inicio-sidebar',
  templateUrl: './inicio-sidebar.component.html',
  standalone: true,
  imports: [ChartModule],
  styleUrls: ['./inicio-sidebar.component.css']
})
export class InicioSidebarComponent implements OnInit {
  basicData: any;
  responseProducto: ResponseProducto[] = [];
  basicOptions: any;

  constructor(private _productoService: ProductoService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Inicialización básica antes de obtener los productos
    this.basicData = {
      labels: [],
      datasets: [
        {
          label: 'Cantidad de Productos',
          data: [],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

    // Llamar al método para cargar los productos y actualizar el gráfico
    this.listarProductos();
  }

  listarProductos() {
    this._productoService.getAll().subscribe({
      next: (data: ResponseProducto[]) => {
        this.responseProducto = data;

        const nombresProductos = this.responseProducto.map(p => p.nombreProd);
        const cantidadProductos = this.responseProducto.map(p => p.stock);

        // Actualiza los datos del gráfico con los productos recibidos
        this.basicData.labels = nombresProductos;
        this.basicData.datasets[0].data = cantidadProductos;

        // Si deseas actualizar el gráfico inmediatamente después de obtener los datos, puedes forzar una detección de cambios
      },
      error: (err) => {
        console.error('Error al obtener los productos', err);
      }
    });
  }
}
