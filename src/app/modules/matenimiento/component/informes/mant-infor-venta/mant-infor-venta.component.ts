import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdenService } from '../../../service/orden/orden.service';
import { ResponseOrden } from '../../../models/orden/orden-response.model';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';
import { RepsonseComprobante } from '../../../models/comprobante/comprobanteVenta.model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-mant-infor-venta',
  templateUrl: './mant-infor-venta.component.html',
  styleUrls: ['./mant-infor-venta.component.css']
})
export class MantInforVentaComponent  implements OnInit{
  mostrarInforme: boolean = false;
  myForm:FormGroup 
  mostrarListaCompleta: boolean = true;
  comprobante:RepsonseComprobante= new RepsonseComprobante()
  fechaActual: Date = new Date();
  responseOrden : ResponseOrden []=[];
  response: ResponseOrden = new ResponseOrden();
  OrdenSelect : ResponseListOrden = new ResponseListOrden()
  orden : ResponseListOrden []=[]
  responseVWOrden: ResponseListOrden = new ResponseListOrden();
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  constructor(
    private datetTipe:DatePipe,
    private fb: FormBuilder,
    private _OrdenService: OrdenService
  )
  {
    const dataNow = new Date();
    const idUsuario = sessionStorage.getItem('idUsuario');
    this.myForm = this.fb.group(
      {
        iidOrden: [{ value: 0, disabled: true }, [Validators.required]],
        nombreProd: [null, Validators.required],
        fechaOrden: [{ value: dataNow }, Validators.required],
        fechaRequerido: [null, Validators.required],
        codigoOrden: [null, Validators.required],
        estadoOrden: ['Activo', Validators.required],
        nombreCliente: [null, Validators.required],
        precioUnitario: [{ value: null, disabled: true }, Validators.required],
        montoTotal: [{ value: null, disabled: true }, Validators.required],
        cantidad: [null, Validators.required],
        nombreUnidad: [null, Validators.required],
        idUsuario: [{ value: idUsuario }, [Validators.required]],
      }
    )
    console.log(this.myForm.getRawValue)
  }
  // cliente = {
  //   nombre: 'Juan Pérez',
  //   telefono: '999-999-999',
  //   email: 'juan.perez@example.com',
  //   direccion: 'Calle Falsa 123',
  //   ciudad: 'Lima',
  //   codigoPostal: '15001'
  // };
  // productos = [
  //   { nombre: 'Zapato Deportivo Nike', cantidad: 2, precioUnitario: 50, subtotal: 100 },
  //   { nombre: 'Sandalias Adidas', cantidad: 1, precioUnitario: 30, subtotal: 30 },
  //   { nombre: 'Botas Timberland', cantidad: 1, precioUnitario: 120, subtotal: 120 }
  // ];
  // totalVenta: number = this.productos.reduce((total, producto) => total + producto.subtotal, 0);
  // metodoPago: string = 'Tarjeta de Crédito';
  // fechaVenta: Date = new Date();


  
  // Método para mostrar el informe
  verInforme(orden:ResponseListOrden) {
    this.responseVWOrden= orden
    console.log(this.responseVWOrden)
    this.mostrarInforme = true;
  }
   // Método para mostrar el informe
   ocultarInforme() {
    this.mostrarInforme = false;
  }
  ngOnInit():void
  {

    this.myForm.patchValue(this.orden)
    this.listarOrden()
  }
  listarOrden()
  {
    this._OrdenService.getAll().subscribe({
      next:(data: ResponseOrden[])=>{
        this.responseOrden = data;
        console.log(data)
      },
      error:()=>{},
      complete:()=>{}
      }

    )
  }
  descargarPDF() {
    const informeVenta = document.getElementById("informe");

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
  filtroOrdenRetrasados()
  {
    const valorForm = this.myForm.getRawValue();
    
    if (valorForm.nombreRol.trim() === '' || valorForm.nombreRol.trim() === 'Todos' ) {
      this.mostrarListaCompleta = true;
      this.listarOrden(); // Vuelve a cargar la lista completa si no hay filtro
      return;
    }
    if ( valorForm.nombreRol.trim() === 'A tiempo' ) {
      this.mostrarListaCompleta = false;
      this.nombreRol.nombre = valorForm.nombreRol;
      this._OrdenService.genericFiltrol(this.nombreRol).subscribe({
        next: (data: ResponseListOrden[]) => {
          this.orden = data; // Actualiza la lista con la respuesta filtrada
          console.log(data);
        },
        error: (error: any) => {
          console.error('Error al filtrar roles', error);
        },
        complete: () => {}
      });
      return;
    }

    this.mostrarListaCompleta = false;
    this.nombreRol.nombre = valorForm.nombreRol;

    this._OrdenService.genericFiltrol(this.nombreRol).subscribe({
      next: (data: ResponseListOrden[]) => {
        this.orden = data; // Actualiza la lista con la respuesta filtrada
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => {}
    });
  }
  formattedFechaOrden(fecha: string | null): string {
    return this.datetTipe.transform(fecha ?? '', 'yyyy-MM-dd') || '';
  }
  
  formattedFechaRequerido(fecha: string | null): string {
    return this.datetTipe.transform(fecha ?? '' , 'yyyy-MM-dd')||'';
  }

}
