import { Component, OnInit } from '@angular/core';
import { ResponseVCliente } from '../../../models/cliente/list-cliente-response.model';
import { ResponseListOrden } from '../../../models/orden/orden-request.model';
import { ClienteService } from '../../../service/cliente/cliente.service';
import { OrdenService } from '../../../service/orden/orden.service';
import { ResponseVWCliente } from '../../../models/cliente/response-VMCliente.model';
import { alert_error } from 'src/app/funcionts/general.funcionts';
import { ResponseOrden } from '../../../models/orden/orden-response.model';

@Component({
  selector: 'app-mant-credito-list',
  templateUrl: './mant-credito-list.component.html',
  styleUrls: ['./mant-credito-list.component.css']
})
export class MantCreditoListComponent implements OnInit {
  responseCliente:ResponseVWCliente[]=[]
  responseOrden:ResponseOrden[]=[]
  constructor
  (
    private _clienteService:ClienteService,
    private _ordenService:OrdenService
  )
  {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  listarCliente()
  {
    this._clienteService.getAll().subscribe(
      {
        next:(data:ResponseVWCliente[])=>{this.responseCliente=data},
        error:(error)=>{alert_error("No existe ni un cliente")},
        complete:()=>{}
      }
    )
  }
  listarOrden()
  {
    this._ordenService.getAll().subscribe(
      {
        next:(data:ResponseOrden[])=>{this.responseOrden=data},
        error:(error)=>{alert_error("No existe ni un cliente")},
        complete:()=>{}
      }
    )
  }



}
