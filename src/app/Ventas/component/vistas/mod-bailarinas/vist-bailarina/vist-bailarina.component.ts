import { Component, OnInit } from '@angular/core';
import { ResponseVerModelos } from 'src/app/modules/matenimiento/models/VerStore/verModelosResponse.model';
import { VistBailarinasService } from 'src/app/modules/matenimiento/service/vistaBailarinas/vist-bailarinas.service';

@Component({
  selector: 'app-vist-bailarina',
  templateUrl: './vist-bailarina.component.html',
  styleUrls: ['./vist-bailarina.component.css']
})
export class VistBailarinaComponent implements OnInit {
  responseVerModelos:ResponseVerModelos[]=[]
  constructor(
    private _verBaularinasService:VistBailarinasService

  )
  {

  }
  ngOnInit(): void {
    this.lsitarBailarinas()
  }
  lsitarBailarinas()
  {
    this._verBaularinasService.getAll().subscribe(
      {
        next:(data:ResponseVerModelos[])=>{
          console.log(data)
          this.responseVerModelos=data
        }
      }
    )
  }


}