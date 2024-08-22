import { Injectable } from '@angular/core';
import { RequestVWSalidaMaterial } from '../../models/salidaMaterial/requestVWSalidaMaterial.model';
import { ResponseVWSalidaMaterial } from '../../models/salidaMaterial/responseVWSalidaMaterial.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { CrudService } from 'src/app/modules/shared/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class SalidaMaterialService extends CrudService<RequestVWSalidaMaterial,ResponseVWSalidaMaterial>{

  constructor(
    protected  http:HttpClient
    ) {
    
      super(http,urlConstants.SalidaMaterial)
   }
}
