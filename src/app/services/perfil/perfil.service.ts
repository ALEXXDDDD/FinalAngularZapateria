import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { urlConstants } from 'src/app/constants/url.constants';
import { ResponsePerfil } from 'src/app/modules/matenimiento/models/perfil/perfil-response.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private router:Router,
    protected  _http:HttpClient
  ) { }
  logout(): void {
    sessionStorage.removeItem('idUsuario');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('nombrePersona');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nombreRol');
    this.router.navigate(['']);
  }
  getDetalle(id: string):Observable<ResponsePerfil[]>
   {
    return this._http.get<ResponsePerfil[]>(`${urlConstants.perfil}/${id}`);
   }
}
