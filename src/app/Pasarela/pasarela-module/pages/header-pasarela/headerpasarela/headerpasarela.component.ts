import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AcciontConstants } from 'src/app/constants/general.constans';
import { alert_sucess } from 'src/app/funcionts/general.funcionts';
import { CarritoItem } from 'src/app/modules/matenimiento/models/carritoItem/carritoItem.model';
import { RequestActualizacionDireccion } from 'src/app/modules/matenimiento/models/cliente/request-actualizacionUsuario.model';
import { ResponsePerfil } from 'src/app/modules/matenimiento/models/perfil/perfil-response.model';
import { ResponseUsuario } from 'src/app/modules/matenimiento/models/usuario/responseUsuario.models';
import { ActuDirecService } from 'src/app/modules/matenimiento/service/actuDirec/actu-direc.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { VistaServiceService } from 'src/app/services/Vista/vista-service.service';
import { VistPerfil } from 'src/app/services/Vista/vistPerfil-model';

@Component({
  selector: 'app-headerpasarela',
  templateUrl: './headerpasarela.component.html',
  styleUrls: ['./headerpasarela.component.css']
})
export class HeaderpasarelaComponent implements OnInit {
  modalRef?: BsModalRef;
  vistPerfil:VistPerfil[]=[]
  totalPrecios?: number;
  total: number = 0;
  responsePerfil: ResponsePerfil[] = [];
  usuarioSelect: ResponseUsuario = new ResponseUsuario();
  requestDireccion : RequestActualizacionDireccion = new RequestActualizacionDireccion()
  titleModal: string = "";
  accionModal: number = 1;
  carrito: CarritoItem[] = [];

  constructor(
    private modalService: BsModalService,
    private _verZapatilService:VistaServiceService,
    private _actuaDireccion : ActuDirecService,
    private _perfilService: PerfilService
  ) { }

  ngOnInit(): void {
    const idUsu = sessionStorage.getItem('idUsuario');

    if (idUsu) {
      this.perfilCoregido(idUsu); // Se llama a `perfilCoregido` solo si `idUsu` no es null.
    } else {
      console.error('No se encontró el idUsuario en sessionStorage');
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
 
  realizarEnvio(template: TemplateRef<any>): void {
  this.titleModal = "Nuevo Crédito"; // Ajusta según sea necesario
  this.accionModal = AcciontConstants.crear; // Ajusta según sea necesario
  this.openModal(template);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  perfil(): void {
    const idUsu = sessionStorage.getItem('idUsuario');
    if (idUsu) {
      this._perfilService.getDetalle(idUsu).subscribe({
        next: (data: ResponsePerfil[]) => {
          this.responsePerfil = data;
        },
        error: (err) => {
          console.error('Error al obtener los detalles del perfil:', err);
        }
      });
    }
  }

  getCloseModalEmmit(res: boolean): void {
    this.modalRef?.hide();
    if (res) {
      // Aquí puedes realizar acciones adicionales si es necesario
    }
  }
}
