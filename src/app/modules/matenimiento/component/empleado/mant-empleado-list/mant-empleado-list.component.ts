import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../../../service/empleado/empleado.service';
import { ResponseEmpleado } from '../../../models/empleado/response-list-empleado.models';
import { ResponseVWEmpleado } from '../../../models/empleado/empleadoVW-response.model';
import { RequestFiltroSueldo } from '../../../models/empleado/request-flitroSueldo.model';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';

@Component({
  selector: 'app-mant-empleado-list',
  templateUrl: './mant-empleado-list.component.html',
  styleUrls: ['./mant-empleado-list.component.css']
})
export class MantEmpleadoListComponent implements OnInit {

  responseEmpleado: ResponseEmpleado[] = [];
  responseWEmpleado: ResponseVWEmpleado[] = [];
  empleadosFiltrados: ResponseVWEmpleado[] = [];
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  empleadoSelect: ResponseVWEmpleado = new ResponseVWEmpleado();
  requestSalario: RequestFiltroSueldo = new RequestFiltroSueldo();
  mostrarListaCompleta: boolean = true;
  modalRef?: BsModalRef;
  titleModal: string = "";
  myFormFilter: FormGroup;
  accionModal: number = 0;

  constructor(
    private _router: Router,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService
  ) {
    this.myFormFilter = this.fb.group({
      nombreRol: [""],
      sueldoMinimo: [""],
      sueldoMaximo: [""]
    });
  }

  ngOnInit(): void {
    this.listarEmpleado();
    
  }
  getEmpleadaos(): ResponseVWEmpleado[] {
      return this.responseEmpleado.flatMap(d => d.empleado); // Aplana la estructura de usuarios
    }
  filtroRol(): void {
    debugger
      const valorForm = this.myFormFilter.get('nombreRol')?.value.trim().toLowerCase();
  
      if (valorForm === '') {
        this.mostrarListaCompleta = true;
        this.empleadosFiltrados = this.getEmpleadaos(); // Vuelve a cargar la lista completa si no hay filtro
        return;
      }
  
      this.mostrarListaCompleta = false;
      this.nombreRol.nombre = valorForm;
      debugger
      this._empleadoService.genericFiltrol(this.nombreRol).subscribe({
        next: (data: ResponseVWEmpleado[]) => {
          if (!data || data.length === 0) {
            alert('No se encontraron empleados con ese rol');
            this.empleadosFiltrados = [];
            return;
          }
          this.empleadosFiltrados = data; // Actualiza la lista con la respuesta filtrada
          console.log(data);
        },
        error: (error: any) => {
          console.error('Error al filtrar roles', error);
          alert('Error al filtrar empleados. Intente de nuevo');
        },
        complete: () => {}
      });
    }
  listarEmpleado(): void {
    this._empleadoService.getAll().subscribe({
      next: (data: ResponseEmpleado[]) => {
        this.responseEmpleado = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error al listar empleados:', error);
      }
    });
  }

  filtroSueldo(): void {
    const valores = this.myFormFilter.getRawValue();
    const sueldoMinimo = valores.sueldoMinimo?.toString().trim();
    const sueldoMaximo = valores.sueldoMaximo?.toString().trim();
    if (!sueldoMaximo && !sueldoMinimo) {
      this.mostrarListaCompleta = true;
      this.listarEmpleado();
      return;
    }

    this.mostrarListaCompleta = false;
    this.requestSalario.sueldoMaximo = valores.sueldoMaximo;
    this.requestSalario.sueldoMinimo = valores.sueldoMinimo;

    this._empleadoService.filtroSueldo(this.requestSalario).subscribe({
      next: (data: ResponseVWEmpleado[]) => {
        this.responseWEmpleado = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error al filtrar empleados por sueldo:', error);
      }
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  crearEmpleado(template: TemplateRef<any>): void {
    this.titleModal = "Nuevo Empleado";
    this.empleadoSelect = new ResponseVWEmpleado();
    this.accionModal = AcciontConstants.crear;
    this.openModal(template);
  }

  editarEmpleado(template: TemplateRef<any>, Empleado: ResponseVWEmpleado): void {
    this.titleModal = "Actualizar Empleado";
    this.empleadoSelect = Empleado;
    this.accionModal = AcciontConstants.editar;
    this.openModal(template);
  }

  eliminarEmpleado(id: number): void {
    if (confirm("¿Estás seguro de eliminar?")) {
      this._empleadoService.delete(id).subscribe({
        next: () => {
          alert("Empleado eliminado correctamente");
          this.listarEmpleado();
        },
        error: (error) => {
          console.error('Error al eliminar empleado:', error);
        }
      });
    }
  }

  getCloseModalEmmit(res: boolean): void {
    this.modalRef?.hide();
    if (res) {
      this.listarEmpleado();
    }
  }

  limpiarFiltros() {
    this.myFormFilter.reset(); // Resetea los campos del formulario
    this.mostrarListaCompleta = true; // Muestra la lista completa
    this.listarEmpleado(); // Recarga la lista completa
  }
}
