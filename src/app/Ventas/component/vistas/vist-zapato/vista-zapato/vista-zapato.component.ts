import { Component, OnInit } from '@angular/core';
import { ResponseVerModelos } from 'src/app/modules/matenimiento/models/VerStore/verModelosResponse.model';
import { VistZapatosService } from 'src/app/modules/matenimiento/service/vistaZapatos/vist-zapatos.service';

@Component({
  selector: 'app-vista-zapato',
  templateUrl: './vista-zapato.component.html',
  styleUrls: ['./vista-zapato.component.css']
})
export class VistaZapatoComponent implements OnInit {
  responseVerModelos:ResponseVerModelos[]=[]
  constructor(
    private _verZapatosService:VistZapatosService

  )
  {

  }
  ngOnInit(): void {
    this.ñostarZapatillas()
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


}

