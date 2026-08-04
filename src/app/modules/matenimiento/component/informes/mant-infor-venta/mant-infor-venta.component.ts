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
export class MantInforVentaComponent implements OnInit {

  mostrarInforme: boolean = false;
  myForm: FormGroup;

  mostrarListaCompleta: boolean = true;

  comprobante: RepsonseComprobante = new RepsonseComprobante();

  fechaActual: Date = new Date();

  responseOrden: ResponseOrden[] = [];

  response: ResponseOrden = new ResponseOrden();

  OrdenSelect: ResponseListOrden = new ResponseListOrden();

  orden: ResponseListOrden[] = [];

  responseVWOrden: ResponseListOrden = new ResponseListOrden();

  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();

  // ==========================================
  // IGV FIJO
  // ==========================================
  igv: number = 10;


  constructor(
    private datetTipe: DatePipe,
    private fb: FormBuilder,
    private _OrdenService: OrdenService
  ) {

    const dataNow = new Date();
    const idUsuario = sessionStorage.getItem('idUsuario');

    this.myForm = this.fb.group({

      iidOrden: [
        { value: 0, disabled: true },
        [Validators.required]
      ],

      nombreProd: [
        null,
        Validators.required
      ],

      fechaOrden: [
        { value: dataNow },
        Validators.required
      ],

      fechaRequerido: [
        null,
        Validators.required
      ],

      codigoOrden: [
        null,
        Validators.required
      ],

      estadoOrden: [
        'Activo',
        Validators.required
      ],

      nombreCliente: [
        null,
        Validators.required
      ],

      precioUnitario: [
        { value: null, disabled: true },
        Validators.required
      ],

      montoTotal: [
        { value: null, disabled: true },
        Validators.required
      ],

      cantidad: [
        null,
        Validators.required
      ],

      nombreUnidad: [
        null,
        Validators.required
      ],

      idUsuario: [
        { value: idUsuario },
        [Validators.required]
      ]

    });

    console.log(this.myForm.getRawValue());
  }


  // ==========================================
  // SUBTOTAL DE LA VENTA
  // ==========================================
  get subtotalVenta(): number {

    return Number(
      this.responseVWOrden?.montoTotal ?? 0
    );

  }


  // ==========================================
  // TOTAL + IGV
  // ==========================================
  get totalConIGV(): number {

    return this.subtotalVenta + this.igv;

  }


  // ==========================================
  // NOMBRE COMPLETO DEL CLIENTE
  // ==========================================
  get nombreCompletoCliente(): string {

    // Si tu backend ya devuelve el nombre completo
    if (this.responseVWOrden?.nombrePersona) {

      return this.responseVWOrden.nombrePersona;

    }

    // Si no existe, utiliza nombreCliente
    if (this.responseVWOrden?.nombreCliente) {

      return this.responseVWOrden.nombreCliente;

    }

    return 'Cliente no registrado';

  }


  // ==========================================
  // MOSTRAR INFORME
  // ==========================================
  verInforme(orden: ResponseListOrden): void {

    this.responseVWOrden = orden;

    console.log(
      'Orden seleccionada:',
      this.responseVWOrden
    );

    console.log(
      'Nombre completo:',
      this.nombreCompletoCliente
    );

    console.log(
      'Subtotal:',
      this.subtotalVenta
    );

    console.log(
      'IGV:',
      this.igv
    );

    console.log(
      'Total:',
      this.totalConIGV
    );

    this.fechaActual = new Date();

    this.mostrarInforme = true;
  }


  // ==========================================
  // OCULTAR INFORME
  // ==========================================
  ocultarInforme(): void {

    this.mostrarInforme = false;

  }


  // ==========================================
  // INICIALIZAR COMPONENTE
  // ==========================================
  ngOnInit(): void {

    this.myForm.patchValue(this.orden);

    this.listarOrden();

  }


  // ==========================================
  // LISTAR TODAS LAS ÓRDENES
  // ==========================================
  listarOrden(): void {

    this._OrdenService.getAll().subscribe({

      next: (data: ResponseOrden[]) => {

        this.responseOrden = data;

        console.log(
          'Órdenes obtenidas:',
          data
        );

      },

      error: (error) => {

        console.error(
          'Error al obtener las órdenes:',
          error
        );

      },

      complete: () => {

        console.log(
          'Listado de órdenes completado'
        );

      }

    });

  }


  // ==========================================
  // DESCARGAR PDF
  // ==========================================
  descargarPDF(): void {

    const informeVenta =
      document.getElementById('informe');

    if (!informeVenta) {

      console.error(
        'No se encontró el elemento informe'
      );

      return;
    }


    html2canvas(informeVenta, {

      scale: 2,

      useCORS: true,

      logging: false

    }).then(canvas => {

      const imgData =
        canvas.toDataURL('image/png');

      const pdf =
        new jsPDF(
          'p',
          'mm',
          'a4'
        );


      const imgWidth = 190;

      const pageHeight =
        pdf.internal.pageSize.height;

      const imgHeight =
        canvas.height *
        imgWidth /
        canvas.width;


      let heightLeft =
        imgHeight;

      let position = 10;


      // ==========================================
      // PRIMERA PÁGINA
      // ==========================================

      pdf.addImage(
        imgData,
        'PNG',
        10,
        position,
        imgWidth,
        imgHeight
      );


      heightLeft -=
        pageHeight - 20;


      // ==========================================
      // PÁGINAS ADICIONALES
      // ==========================================

      while (heightLeft > 0) {

        position =
          heightLeft -
          imgHeight +
          10;

        pdf.addPage();

        pdf.addImage(
          imgData,
          'PNG',
          10,
          position,
          imgWidth,
          imgHeight
        );

        heightLeft -=
          pageHeight - 20;

      }


      // ==========================================
      // NOMBRE DEL PDF
      // ==========================================

      const nombreCliente =
        this.nombreCompletoCliente
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9\-]/g, '');


      pdf.save(
        `informe-venta-${nombreCliente}.pdf`
      );

    }).catch(error => {

      console.error(
        'Error al generar PDF:',
        error
      );

    });

  }


  // ==========================================
  // FILTRO DE ÓRDENES RETRASADAS / PENDIENTES
  // ==========================================
  filtroOrdenRetrasados(): void {

    const valorForm =
      this.myForm.getRawValue();


    // ==========================================
    // TODOS
    // ==========================================

    if (
      !valorForm.nombreRol ||
      valorForm.nombreRol.trim() === '' ||
      valorForm.nombreRol.trim() === 'Todos'
    ) {

      this.mostrarListaCompleta = true;

      this.listarOrden();

      return;
    }


    // ==========================================
    // A TIEMPO
    // ==========================================

    if (
      valorForm.nombreRol.trim() === 'A tiempo'
    ) {

      this.mostrarListaCompleta = false;

      this.nombreRol.nombre =
        valorForm.nombreRol;


      this._OrdenService
        .genericFiltrol(this.nombreRol)
        .subscribe({

          next: (
            data: ResponseListOrden[]
          ) => {

            this.orden = data;

            console.log(
              'Órdenes filtradas:',
              data
            );

          },

          error: (error: any) => {

            console.error(
              'Error al filtrar órdenes:',
              error
            );

          },

          complete: () => {}

        });

      return;
    }


    // ==========================================
    // OTROS FILTROS
    // ==========================================

    this.mostrarListaCompleta = false;

    this.nombreRol.nombre =
      valorForm.nombreRol;


    this._OrdenService
      .genericFiltrol(this.nombreRol)
      .subscribe({

        next: (
          data: ResponseListOrden[]
        ) => {

          this.orden = data;

          console.log(
            'Órdenes filtradas:',
            data
          );

        },

        error: (error: any) => {

          console.error(
            'Error al filtrar roles:',
            error
          );

        },

        complete: () => {}

      });

  }


  // ==========================================
  // FORMATEAR FECHA DE ORDEN
  // ==========================================
  formattedFechaOrden(
    fecha: string | null
  ): string {

    return this.datetTipe.transform(
      fecha ?? '',
      'yyyy-MM-dd'
    ) || '';

  }


  // ==========================================
  // FORMATEAR FECHA REQUERIDA
  // ==========================================
  formattedFechaRequerido(
    fecha: string | null
  ): string {

    return this.datetTipe.transform(
      fecha ?? '',
      'yyyy-MM-dd'
    ) || '';

  }

}