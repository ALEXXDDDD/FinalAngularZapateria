import { Component, OnInit, TemplateRef } from '@angular/core';
import { ResponseOrden } from '../../../models/orden/orden-response.model';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { OrdenService } from '../../../service/orden/orden.service';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { RequestUnidad } from '../../../models/unidad/p/unidad-request.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';


enum EstadoOrden {
  Todas = "todas",
  A_Tiempo = "a-tiempo",
  Retrasadas = "retrasadas"
}

@Component({
  selector: 'app-mant-list-orden',
  templateUrl: './mant-list-orden.component.html',
  styleUrls: ['./mant-list-orden.component.css']
})
export class MantListOrdenComponent implements OnInit {
  responseOrden : ResponseOrden []=[];
  response: ResponseOrden = new ResponseOrden();
  OrdenSelect : ResponseListOrden = new ResponseListOrden()
  orden : ResponseListOrden []=[]
  UnidadSelect : RequestUnidad = new RequestUnidad()
  responseVWOrden: ResponseListOrden = new ResponseListOrden();
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  modalRef? : BsModalRef;
  titleModal : string = ""
  myFormFilter: FormGroup;
  mostrarListaCompleta: boolean = true;
  accionModal : number = 0
  constructor (
    private _router:Router,
    private datetTipe:DatePipe,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _OrdenService: OrdenService

  )
  {
    this.myFormFilter = this.fb.group({
      nombreRol: [""]
    });
  }
  ngOnInit():void
  {
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
  filtroOrdenRetrasados()
  {
    const valorForm = this.myFormFilter.getRawValue();
    
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  crearOrden(template:TemplateRef<any>)
  {
    this.titleModal= "Nuevo Orden"
    this.OrdenSelect = new ResponseListOrden()
    this.accionModal = AcciontConstants.crear
    this.openModal(template)
  }
  editarOrden(template:TemplateRef<any>,Orden:ResponseListOrden)
  {
    this.titleModal= "Actaulizar Orden"
    this.OrdenSelect = Orden
    this.accionModal = AcciontConstants.editar
    this.openModal(template)
  }
  crearUnidad(templateUnidad:TemplateRef<any>)
  {
    this.titleModal= "Crear Unidad"
    this.UnidadSelect = new RequestUnidad()
    this.accionModal = AcciontConstants.crear
    this.openModal(templateUnidad)
  }
  eliminarOrden(id:number)
  {
    let result = confirm("Estas seguro de Eliminar")
    if(result)
    {
      this._OrdenService.delete(id).subscribe(
        {
          next:(data:number)=>
          {
            alert("Se elimino Correctamente")
          },
          error:()=>{},
          complete:()=>{}
        }
      )
    }
  }
  getCloseModalEmmit(res:boolean)
  {
    this.modalRef?.hide()
    if(res)
    {
      this.listarOrden()
    }
  }
}
