import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { RolService } from '../../../service/rol.service';
import { ResponseRol } from '../../../models/rol/rol-response.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpHeaders } from '@angular/common/http';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestFilterGeneric } from '../../../models/genericFilterRequest.model';
import { ResponseFilterGeneric } from '../../../models/genericFilterResponse.models';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';

@Component({
  selector: 'app-mant-rol-list',
  templateUrl: './mant-rol-list.component.html',
  styleUrls: ['./mant-rol-list.component.css']
})
export class MantRolListComponent implements OnInit {
  nombre: string = '';
  Rol: ResponseRol[] = []; // Lista de roles
  modalRef?: BsModalRef;
  rolSelect: ResponseRol = new ResponseRol(); // Para mandar al registro
  titleModal: string = "";
  accionModal: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 1;
  request: RequestFilterGeneric = new RequestFilterGeneric();
  myFormFilter: FormGroup;
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  mostrarListaCompleta: boolean = true;

  constructor(
    private _router: Router, 
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _rolService: RolService
  ) {
    this.myFormFilter = this.fb.group({
      nombreRol: [""],
      descripRol: [""]
    });
  }

  ngOnInit(): void {
    this.filtrar(); // Se carga la lista completa al iniciar
  }

  listarRoles() {
    this._rolService.getAll().subscribe({
      next: (data: ResponseRol[]) => {
        this.Rol = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

  crearRol(template: TemplateRef<any>) {
    this.titleModal = "Nuevo Rol";
    this.rolSelect = new ResponseRol();
    this.accionModal = AcciontConstants.crear;
    this.openModal(template);
  }

  editarRol(template: TemplateRef<any>, rol: ResponseRol) {
    this.titleModal = "Editar Rol";
    this.rolSelect = rol;
    this.accionModal = AcciontConstants.editar;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCloseModalEmmit(res: boolean) {
    this.modalRef?.hide();
    if (res) {
      this.filtrar();
    }
  }

  listarFiltro() {
    const valorForm = this.myFormFilter.getRawValue();
    
    if (valorForm.nombreRol.trim() === '') {
      this.mostrarListaCompleta = true;
      this.filtrar(); // Vuelve a cargar la lista completa si no hay filtro
      return;
    }

    this.mostrarListaCompleta = false;
    this.nombreRol.nombre = valorForm.nombreRol;

    this._rolService.genericFiltrol(this.nombreRol).subscribe({
      next: (data: ResponseRol[]) => {
        this.Rol = data; // Actualiza la lista con la respuesta filtrada
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => {}
    });
  }

  eliminarRol(id: number) {
    let result = confirm("¿Estás seguro de eliminar?");
    if (result) {
      debugger
      this._rolService.delete(id).subscribe({
        next: () => {
          alert("Eliminado exitosamente");
          this.filtrar(); // Recargar la lista después de eliminar
        },
        error: (error) => {
          console.error('Error al eliminar rol', error);
        },
        complete: () => {}
      });
    }
  }

  filtrar() {
    const valorForm = this.myFormFilter.getRawValue();

    // this.request.filtros = [
    //   { name: "nombreRol", value: valorForm.nombreRol },
    //   { name: "descripRol", value: valorForm.descripRol }
    // ];

    this._rolService.genericFilter(this.request).subscribe({
      next: (data: ResponseFilterGeneric<ResponseRol>) => {
        this.Rol = data.lista;
        this.totalItems = data.totalRegistros;
        console.log(data);
      },
      error: (error) => {
        console.error("Error al filtrar roles", error);
      },
      complete: () => {
        console.log("Filtrado completado");
      }
    });
  }

  changePage(event: PageChangedEvent) {
    this.request.numeroPagina = event.page;
    this.filtrar();
  }

  changeItemsPerPage() {
    this.request.cantidad = this.itemsPerPage;
    this.filtrar();
  }
  limpiarFiltros() {
    this.myFormFilter.reset(); // Resetea los campos del formulario
    this.mostrarListaCompleta = true; // Muestra la lista completa
    this.filtrar(); // Recarga la lista completa
  }
}
