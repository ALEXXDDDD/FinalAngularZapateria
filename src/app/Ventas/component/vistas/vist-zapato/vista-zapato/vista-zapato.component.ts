import { Component, OnInit } from '@angular/core';
import { ResponseProducto } from 'src/app/modules/matenimiento/models/producto/producto-response.model';
import { ResponseVerModelos } from 'src/app/modules/matenimiento/models/VerStore/verModelosResponse.model';
import { VistZapatosService } from 'src/app/modules/matenimiento/service/vistaZapatos/vist-zapatos.service';
import { VistaServiceService } from 'src/app/services/Vista/vista-service.service';

@Component({
  selector: 'app-vista-zapato',
  templateUrl: './vista-zapato.component.html',
  styleUrls: ['./vista-zapato.component.css']
})
export class VistaZapatoComponent implements OnInit {
  responseVerModelos:ResponseVerModelos[]=[]
  responseProducto :ResponseProducto[]=[] 
  constructor(
    private _verZapatosService:VistZapatosService,
    private _verZapatilService:VistaServiceService

  )
  {

  }
  ngOnInit(): void {
    this.mostarZapatillas("Zapatos")
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

