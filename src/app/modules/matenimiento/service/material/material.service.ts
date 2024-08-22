import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/modules/shared/services/crud.service';
import { RequestVWMaterial } from '../../models/material/material-requestVW.model';
import { ResponseVWMaterial } from '../../models/material/material-responseVW.model';
import { HttpClient } from '@angular/common/http';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponseMaterial } from '../../models/material/material-response.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService extends CrudService<RequestVWMaterial,ResponseVWMaterial> {

  constructor(
    protected http:HttpClient
  ) {
    super (http,urlConstants.material)
   }
}
