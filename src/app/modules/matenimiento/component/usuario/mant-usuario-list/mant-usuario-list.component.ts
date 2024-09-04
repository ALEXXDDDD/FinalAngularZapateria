import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ResponseVUsuario } from 'src/app/models/response-vwUsuario-model';
import { UsuarioService } from '../../../service/usuario/usuario.service';
import { ResponseUsuario } from '../../../models/usuario/responseUsuario.models';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { RequestFiltroNombre } from '../../../models/requestFiltroNombre.model';

@Component({
  selector: 'app-mant-usuario-list',
  templateUrl: './mant-usuario-list.component.html',
  styleUrls: ['./mant-usuario-list.component.css']
})
export class MantUsuarioListComponent implements OnInit {
  Usuario: ResponseUsuario[] = [];
  usuariosFiltrados: ResponseVUsuario[] = []; // Lista para manejar los usuarios filtrados
  usuarioSelect: ResponseVUsuario = new ResponseVUsuario();
  modalRef?: BsModalRef;
  titleModal: string = "";
  accionModal: number = 0;
  myFormFilter: FormGroup;
  nombreRol: RequestFiltroNombre = new RequestFiltroNombre();
  mostrarListaCompleta: boolean = true;

  constructor(
    private _router: Router, 
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _usuarioService: UsuarioService
  ){
    this.myFormFilter = this.fb.group({
      usuario: [""],
      password: [""],
      nombreRol: [""],
      email: [""],
      nombrePersona: [""],
      tipoPersona: [""],
      direccion: [""],
      irol: [""],
      idUsuario: [""],
    });
  }

  ngOnInit(): void {
    this.listarUsuario();
  }

  listarUsuario(): void {
    this._usuarioService.getAll().subscribe({
      next: (data: ResponseUsuario[]) => {
        this.Usuario = data;
        this.usuariosFiltrados = this.getUsuarios(); // Inicializa con todos los usuarios
      },
      error: (error) => { alert("Ocurrió un Error") },
      complete: () => {}
    });
  }

  filtroRol(): void {
    const valorForm = this.myFormFilter.get('nombreRol')?.value.trim().toLowerCase();

    if (valorForm === '') {
      this.mostrarListaCompleta = true;
      this.usuariosFiltrados = this.getUsuarios(); // Vuelve a cargar la lista completa si no hay filtro
      return;
    }

    this.mostrarListaCompleta = false;
    this.nombreRol.nombre = valorForm;

    this._usuarioService.genericFiltrol(this.nombreRol).subscribe({
      next: (data: ResponseVUsuario[]) => {
        this.usuariosFiltrados = data; // Actualiza la lista con la respuesta filtrada
        console.log(data);
      },
      error: (error: any) => {
        console.error('Error al filtrar roles', error);
      },
      complete: () => {}
    });
  }

  getUsuarios(): ResponseVUsuario[] {
    return this.Usuario.flatMap(d => d.usuarios); // Aplana la estructura de usuarios
  }

  crearCliente(template: TemplateRef<any>): void {
    this.titleModal = "Nuevo Cliente";
    this.usuarioSelect = new ResponseVUsuario();
    this.accionModal = AcciontConstants.crear;
    this.openModal(template);
  }

  editarCliente(template: TemplateRef<any>, Cliente: ResponseVUsuario): void {
    this.titleModal = "Editar Cliente";
    this.usuarioSelect = Cliente;
    this.accionModal = AcciontConstants.editar;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  getCloseModalEmmit(res: boolean): void {
    this.modalRef?.hide();
    if (res) {
      this.listarUsuario();
    }
  }
  limpiarFiltros() {
    this.myFormFilter.reset(); // Resetea los campos del formulario
    this.mostrarListaCompleta = true; // Muestra la lista completa
    this.listarUsuario(); // Recarga la lista completa
  }
}
