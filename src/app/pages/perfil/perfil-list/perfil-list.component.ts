import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ResponsePerfil } from 'src/app/modules/matenimiento/models/perfil/perfil-response.model';
import { AuthGoogleService } from 'src/app/services/google/auth-goggle-service.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})
export class PerfilListComponent implements OnInit {
  /**
   * FLIT:Declaracion de Variables
   */
  
  responsePerfil : ResponsePerfil[]=[]

  constructor(
    private _perfilService : PerfilService,
    private authGoogel: AuthGoogleService, 

  )
  {
    
  }
  logout(): void {
    this._perfilService.logout();
   
  }
  perfil()
  {
    let idUsu = sessionStorage.getItem('idUsuario')
    if(idUsu!=null)
    {
      this._perfilService.getDetalle(idUsu).subscribe(
        {
          next:(data:ResponsePerfil[])=>{this.responsePerfil=data }
        }
      )
    }
   
  }
  ngOnInit(): void {
    this.perfil()
  }

}
