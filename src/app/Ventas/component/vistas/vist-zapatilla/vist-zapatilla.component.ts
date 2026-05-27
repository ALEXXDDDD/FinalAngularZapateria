import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import { ResponseVerModelos } from 'src/app/modules/matenimiento/models/VerStore/verModelosResponse.model';
import { ProductoService } from 'src/app/modules/matenimiento/service/producto/producto.service';
import { VistZapatillasService } from 'src/app/modules/matenimiento/service/vistaZapatillas/vist-zapatillas.service';
import { VistZapatosService } from 'src/app/modules/matenimiento/service/vistaZapatos/vist-zapatos.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { VistaServiceService } from 'src/app/services/Vista/vista-service.service';

@Component({
  selector: 'app-vist-zapatilla',
  templateUrl: './vist-zapatilla.component.html',
  styleUrls: ['./vist-zapatilla.component.css']
})
export class VistZapatillaComponent implements OnInit {
  responseVerModelos:ResponseVerModelos[]=[]
  responseProducto :ResponseProducto[]=[] 
  constructor(
    private _verZapatosService:VistZapatosService,
    private _verZapatilService:VistaServiceService,
    private _carritoService:CarritoService,
    private modalService: BsModalService,
    private _productoService : ProductoService,
    private messageService: MessageService,

  )
  {

  }
  ngOnInit(): void {
    this.mostarZapatillas("Zapatillas")
  }
  addProducto(prod:ResponseProducto)
  {
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Producto Agregado', 
      detail: `${prod.nombreProd} ha sido agregado al carrito.` 
    });
    this._carritoService.addProducto(prod)
  }
  ñostarZapatillas()
  {
    this._verZapatosService.getAll().subscribe(
      {
        next:(data:ResponseVerModelos[])=>{
          console.log(data)
          this.responseVerModelos=data
        }
      }
    )
  }
  mostarZapatillas(request: string) {
    const body = JSON.stringify(request); //
    this._verZapatilService.nombreModelo(body).subscribe(
      {
        next: (data: ResponseProducto[]) => {
          console.log(data);
          this.responseProducto = data;
        }
      }
    );
  }

}
