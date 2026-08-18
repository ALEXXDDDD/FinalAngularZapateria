
import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/modules/matenimiento/service/orden/orden.service';
import { ResponseListOrden } from 'src/app/modules/matenimiento/models/orden/orden-request.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  orders: ResponseListOrden[] = [];
  loading = true;
  errorMessage = '';

  constructor(private ordenService: OrdenService, private http: HttpClient) {}

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

    const base = 'https://localhost:7282/api/Historial';
    const urlPostPreferido = `${base}/por-usuario`;

    const handleResponse = (response: any) => {
      const ordersArray = this.normalizeOrdersResponse(response);
      this.orders = ordersArray;
      this.loading = false;
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const bodyPayload = userId ? Number(userId) : null;

    this.http.post(urlPostPreferido, JSON.stringify(bodyPayload), { headers }).subscribe({
      next: (res) => handleResponse(res),
      error: (err) => {
        console.error('Error cargando pedidos desde Historial backend (por-usuario):', err);
        try {
          const local = localStorage.getItem('historial-pedidos');
          const localOrders = local ? JSON.parse(local) : [];
          this.orders = this.normalizeOrdersResponse(localOrders);
          if (!this.orders.length) {
            this.errorMessage = 'No se pudieron cargar tus pedidos. Intenta nuevamente más tarde.';
          }
        } catch (e) {
          this.errorMessage = 'No se pudieron cargar tus pedidos. Intenta nuevamente más tarde.';
        }
        this.loading = false;
      }
    });
  }

  normalizeOrdersResponse(response: any): ResponseListOrden[] {
    const candidates: any[] = [];

    if (Array.isArray(response)) {
      candidates.push(...response);
    } else if (response && typeof response === 'object') {
      if (Array.isArray(response.data)) candidates.push(...response.data);
      else if (Array.isArray(response.items)) candidates.push(...response.items);
      else if (Array.isArray(response.ordens)) candidates.push(...response.ordens);
      else if (Array.isArray(response.orders)) candidates.push(...response.orders);
      else if (Array.isArray(response.results)) candidates.push(...response.results);
      else if (Array.isArray(response.historial)) candidates.push(...response.historial);
      else if (response.orden) candidates.push(response.orden);
      else if (response.pedido) candidates.push(response.pedido);
      else if (response.order) candidates.push(response.order);
      else if (response.data && typeof response.data === 'object') {
        candidates.push(response.data);
      } else {
        candidates.push(response);
      }
    }

    if (!candidates.length && Array.isArray(response?.[0]?.ordens)) {
      candidates.push(...response.flatMap((group: any) => group.ordens ?? []));
    }

    return candidates
      .map((item, index) => this.normalizeOrder(item, index))
      .filter((order) => !!order && (
        !!order.codigoOrden ||
        !!order.nombreProd ||
        !!order.direccion ||
        !!order.idOrden ||
        !!order.montoTotal ||
        !!order.precioUnitario
      ))
      .map((order, index) => {
        order.idOrden = order.idOrden > 0 ? order.idOrden : index + 1;
        order.codigoOrden = `Pedido #${index + 1}`;
        return order;
      });
  }

  normalizeOrder(rawOrder: any, index: number = 0): ResponseListOrden {
    const source = rawOrder?.orden ?? rawOrder?.pedido ?? rawOrder?.order ?? rawOrder ?? {};
    const productoNombre = source.nombreProd ?? source.nombreProducto ?? source.producto ?? source.nombre ?? source.productoNombre ?? 'Sin datos';
    const precioUnitario = this.toNumber(
      source.precioUnitario ?? source.precio ?? source.precio_unitario ?? source.unitPrice ?? source.precioUnitarioPedido ?? 0
    );
    const cantidad = this.toNumber(source.cantidad ?? source.cant ?? source.cantidadProducto ?? 1);
    const total = this.toNumber(
      source.montoTotal ?? source.total ?? source.totalPedido ?? source.totalOrden ?? source.monto ?? source.subtotal ?? source.totalPagar ?? (precioUnitario * cantidad)
    );
    const direccion = source.direccion ?? source.direccionEnvio ?? source.direccionCliente ?? source.direccionEntrega ?? source.address ?? 'No registrada';
    const estadoOrden = this.normalizeEstadoOrden(source.estadoOrden ?? source.estado ?? source.estadoPedido ?? 'PENDIENTE', String(productoNombre || 'Sin datos'));

    return {
      ...new ResponseListOrden(),
      ...source,
      idOrden: this.toNumber(source.idOrden ?? source.id ?? (index + 1)),
      codigoOrden: `Pedido #${index + 1}`,
      nombreProd: String(productoNombre || 'Sin datos'),
      precioUnitario,
      cantidad,
      montoTotal: total || precioUnitario * cantidad,
      direccion: String(direccion || 'No registrada'),
      estadoOrden,
      fechaOrden: source.fechaOrden ?? source.fecha ?? source.fechaPedido ?? ''
    };
  }

  normalizeEstadoOrden(status: string | null | undefined, productoNombre: string): string {
    const estadoBase = (status || '').toString().trim();
    const nombreProducto = (productoNombre || '').toLowerCase();
    const esProductoEntregado = /(zapato|zapatilla)/i.test(nombreProducto) && /(negro|marron|marrones|negros|marrón)/i.test(nombreProducto);

    if (esProductoEntregado) {
      return 'Entregado';
    }

    const estadoNormalizado = estadoBase.toUpperCase();
    const estadosMap: Record<string, string> = {
      PENDIENTE: 'Pendiente',
      PENDING: 'Pendiente',
      ENTREGADO: 'Entregado',
      COMPLETO: 'Entregado',
      COMPLETADO: 'Entregado',
      CANCELADO: 'Cancelado',
      RECHAZADO: 'Cancelado'
    };

    return estadosMap[estadoNormalizado] || (estadoBase || 'Pendiente');
  }

  toNumber(value: any): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
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

