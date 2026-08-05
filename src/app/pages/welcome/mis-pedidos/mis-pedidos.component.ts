
import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/modules/matenimiento/service/orden/orden.service';
import { ResponseListOrden } from 'src/app/modules/matenimiento/models/orden/orden-request.model';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  orders: ResponseListOrden[] = [];
  loading = true;
  errorMessage = '';

  constructor(private ordenService: OrdenService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {

    // ID COMO STRING
    const userId: string =
      sessionStorage.getItem('idUsuario') ||
      sessionStorage.getItem('idCliente') ||
      sessionStorage.getItem('idPersona') ||
      '';

    if (!userId.trim()) {
      this.errorMessage = 'Usuario no identificado. Inicia sesión.';
      this.loading = false;
      return;
    }

    this.ordenService.ordenesPorUsuario(userId).subscribe({
      next: (response: ResponseListOrden[] | any) => {

        let ordersArray: ResponseListOrden[] = [];

        if (Array.isArray(response)) {
          ordersArray = response;
        } 
        else if (response?.data && Array.isArray(response.data)) {
          ordersArray = response.data;
        } 
        else if (response?.items && Array.isArray(response.items)) {
          ordersArray = response.items;
        } 
        else if (response?.ordens && Array.isArray(response.ordens)) {
          ordersArray = response.ordens;
        } 
        else if (response?.results && Array.isArray(response.results)) {
          ordersArray = response.results;
        }

        if (!ordersArray.length && Array.isArray(response?.[0]?.ordens)) {
          ordersArray = response.flatMap(
            (group: any) => group.ordens ?? []
          );
        }

        this.orders = ordersArray;
        this.loading = false;
      },

      error: (error: unknown) => {
        console.error('Error cargando pedidos del cliente:', error);
        this.errorMessage =
          'No se pudieron cargar tus pedidos. Intenta nuevamente más tarde.';
        this.loading = false;
      }
    });
  }

  getTotalSpent(): number {
    return this.orders.reduce(
      (sum, order) => sum + this.getOrderTotal(order),
      0
    );
  }

  formatDate(value: string | null | undefined): string {
    return value
      ? new Date(value).toLocaleDateString('es-PE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '-';
  }

  getOrderTotal(order: ResponseListOrden): number {
    if (
      order &&
      typeof order.montoTotal === 'number' &&
      order.montoTotal >= 0
    ) {
      return order.montoTotal;
    }

    const precio = Number(order?.precioUnitario || 0);
    const cantidad = Number(order?.cantidad || 0);

    return precio * cantidad;
  }

  getStatusClass(status: string | null | undefined): string {
    const normalized = (status || '')
      .toLowerCase()
      .replace(/\s+/g, '-');

    return {
      'pendiente': 'pending',
      'entregado': 'entregado',
      'completo': 'entregado',
      'cancelado': 'cancelado',
      'rechazada': 'cancelado'
    }[normalized] || 'pending';
  }

  getUsuarioNombre(): string {
    return (
      sessionStorage.getItem('nombrePersona') ||
      sessionStorage.getItem('nombre') ||
      'Cliente'
    );
  }
}

