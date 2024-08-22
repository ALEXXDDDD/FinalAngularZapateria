import { Component, OnInit } from '@angular/core';
import { ResponseVerModelos } from 'src/app/modules/matenimiento/models/VerStore/verModelosResponse.model';
import { VistZapatillasService } from 'src/app/modules/matenimiento/service/vistaZapatillas/vist-zapatillas.service';

@Component({
  selector: 'app-vist-zapatilla',
  templateUrl: './vist-zapatilla.component.html',
  styleUrls: ['./vist-zapatilla.component.css']
})
export class VistZapatillaComponent implements OnInit {
  responseVerModelos:ResponseVerModelos[]=[]
  constructor(
    private _verZapatillasService:VistZapatillasService

  )
  {

  }
  ngOnInit(): void {
    this.ñostarZapatillas()
  }
  ñostarZapatillas()
  {
    this._verZapatillasService.getAll().subscribe(
      {
        next:(data:ResponseVerModelos[])=>{
          console.log(data)
          this.responseVerModelos=data
        }
      }
    )
  }


}
