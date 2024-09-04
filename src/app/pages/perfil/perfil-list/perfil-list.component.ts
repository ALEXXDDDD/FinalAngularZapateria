import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { ResponsePerfil } from 'src/app/modules/matenimiento/models/perfil/perfil-response.model';
import { AuthGoogleService } from 'src/app/services/google/auth-goggle-service.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { VistaServiceService } from 'src/app/services/Vista/vista-service.service';
import { VistPerfil } from 'src/app/services/Vista/vistPerfil-model';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})
export class PerfilListComponent implements OnInit {
  /**
   * FLIT:Declaracion de Variables
   */
  response:ResponsePerfil[]=[]
  vistPerfil:VistPerfil[]=[]
  responsePerfil = [
    { fotografia: 'https://via.placeholder.com/150', nombre: 'Usuario' },
   
    // Agrega más perfiles si es necesario
  ];

  triggerFileInput(profile: any): void {
    // Aquí puedes manejar la lógica si necesitas realizar alguna acción adicional cuando se hace clic en la imagen
  }

  updateImage(event: any, profile: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        profile.fotografia = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

  constructor(
    private _perfilService : PerfilService,
    private authGoogel: AuthGoogleService, 
    private _verZapatilService:VistaServiceService

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
          next:(data:ResponsePerfil[])=>{this.response=data }
        }
      )
    }
   
  }
  ngOnInit(): void {
    const idUsu = sessionStorage.getItem('idUsuario');

  if (idUsu) {
    this.perfilCoregido(idUsu); // Se llama a `perfilCoregido` solo si `idUsu` no es null.
  } else {
    console.error('No se encontró el idUsuario en sessionStorage');
  }

  }
  perfilCoregido(request:string)
  {
    const body = JSON.stringify(request); //
    this._verZapatilService.perfil(body).subscribe(
      {
        next: (data: VistPerfil[]) => {
          console.log(data);
          this.vistPerfil = data;
        }
      }
    );
  }

}
