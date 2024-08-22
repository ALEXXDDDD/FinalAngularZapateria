import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';


import { RequestLogin } from '../models/login-request.models';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponseLogin } from 'src/app/models/login-response.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { 

  }
  login (request:RequestLogin):Observable<ResponseLogin>
  {
    return this.http.post<ResponseLogin>(urlConstants.auth,request)
  }
}
