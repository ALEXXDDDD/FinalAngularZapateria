import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../enviorements/enviorements';
import { HttpClient } from '@angular/common/http';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CarritoItem } from 'src/app/modules/matenimiento/models/carritoItem/carritoItem.model';
import { Observable, of, Subscription } from 'rxjs';
import { OrdenService } from 'src/app/modules/matenimiento/service/orden/orden.service';
import { MercadoPagoRequest } from 'src/app/modules/matenimiento/service/orden/mercadoPagoRequest';
import { MercadoPagoResponse } from 'src/app/modules/matenimiento/service/orden/mercadoPagoResponse';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { ResponsePerfil } from 'src/app/modules/matenimiento/models/perfil/perfil-response.model';
import { VistaServiceService } from 'src/app/services/Vista/vista-service.service';
import { VistPerfil } from 'src/app/services/Vista/vistPerfil-model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

declare global {
  interface Window {
    Stripe?: any;
  }
}



@Component({
  selector: 'app-pag-pago',
  templateUrl: './pag-pago.component.html',
  styleUrls: ['./pag-pago.component.css']
})

export class PagPagoComponent implements OnInit {

  carrito: CarritoItem[] = [];
  response:ResponsePerfil[]=[]
  vistPerfil:VistPerfil[]=[]
  mercadoPagoRequest:MercadoPagoRequest= new MercadoPagoRequest()
  mercadoPagoResponse:MercadoPagoResponse[]=[]
  total: number = 0;
  private subscription: Subscription = new Subscription();

  constructor( private _verZapatilService:VistaServiceService,    private _perfilService : PerfilService,private _carritoService: CarritoService,private _ordenService:OrdenService) { }

  ngOnInit(): void {
    this.subscription.add(this._carritoService.listarCarrito().subscribe(carrito => {
      this.carrito = carrito;
      this.total = this.calcularTotal(carrito);
    }));
  }

  calcularTotal(carrito: CarritoItem[]): number {
    return carrito.reduce((acc, item) => acc + (item.producto.precioUnitario * item.cantidad), 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  descargarPDF() {
    const informeVenta = document.getElementById("informe-venta");

    if (informeVenta) {
      html2canvas(informeVenta).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190; // Ajustar al ancho de la página
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Añadir la primera imagen al PDF
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Si el contenido excede la altura de la página, añadir páginas adicionales
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('informe-ventas.pdf');
      });
    }
  }
  generarPreferencia()
  {
    let idUsu = sessionStorage.getItem('idUsuario')
    if(idUsu!=null)
    {
      this._perfilService.getDetalle(idUsu).subscribe(
        {
          next:(data:ResponsePerfil[])=>
            {
              this.response=data 
              
              let email = sessionStorage.getItem('email')
              let nombrePersona = sessionStorage.getItem('nombrePersona')
              let idUsu = sessionStorage.getItem('idUsuario')
              // this.mercadoPagoRequest.email= 
            }
        }
      )
    }
    
  }
  perfilCoregido(request:string)
  {
    const body = JSON.stringify(request); //
    this._verZapatilService.perfil(body).subscribe(
      {
        next: (data: VistPerfil[]) => {
          console.log(data);
          this.vistPerfil = data;
        }
      }
    );
  }
}