import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { ResponseLogin } from 'src/app/models/login-response.models';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '818272992678-cacnetaor3df10ftd9ldih4ft588ajnb.apps.googleusercontent.com',
      redirectUri: window.location.origin,
      scope: 'openid profile email',
    };
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh(config);
    
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      if (this.oauthService.hasValidIdToken()) {
        const datos = this.getProfile();
        if (datos) {
          this.enviarBackend(datos['email'], datos['name']).subscribe();
        }
        console.log("Datos obtenidos", datos);
      } else {
        console.warn('El token no es válido o no existe.');
      }
    });
  }

  enviarBackend(email: string, name: string): Observable<ResponseLogin> {
    const backendUrl = 'https://localhost:7282/api/Usuario/validacion-email';
    return this.http.post<ResponseLogin>(backendUrl, { email, name }).pipe(
      tap(data => {
        if (data.success) {
          this.handleSuccessfulLogin(data);
        } else {
          alert_error("No existe tu usuario, por favor regístrate");
          this.router.navigate(['register']);
        }
      }),
      catchError(error => {
        alert_error("Datos incorrectos");
        this.router.navigate(['login']);
        return throwError(error);
      })
    );
  }

  private handleSuccessfulLogin(data: ResponseLogin) {
    alert_sucess("Iniciaste sesión correctamente");
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("nombrePersona", data.persona.nombrePersona);
    sessionStorage.setItem("idUsuario", data.vwUsuario.idUsuario.toString());
    sessionStorage.setItem("usuario", data.vwUsuario.usuario);
    sessionStorage.setItem("nombreRol", data.nameRol);

    switch (data.nameRol) {
      case "Cliente":
        this.router.navigate(['']);
        break;
      case "Administrador":
        this.router.navigate(['dasboard/mantenimiento/producto']);
        break;
      case "Vendedor":
        this.router.navigate(['dasboard']);
        break;
      default:
        console.warn('Rol desconocido:', data.nameRol);
    }
  }

  validateToken(token: string): Observable<any> {
    const backendUrl = 'https://localhost:7282/api/Usuario/validacion-email';
    return this.http.post(backendUrl, { token });
  }

  loginGoogle() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }
}
