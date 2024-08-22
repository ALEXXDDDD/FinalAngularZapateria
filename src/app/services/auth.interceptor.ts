import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { alert_error } from '../funcionts/general.funcionts';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _router:Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = sessionStorage.getItem("token")
    let request = req;

    if(!req.url.includes("dniruc.apisperu.com")&&!req.url.includes("api.hunter.io"))
    {
      if(token)
    {
      request=req.clone(
        {
          setHeaders:{
            authorization: `Bearer ${token}`
          }
        }
      );
     }
    }

    /* else if (!req.url.includes("api.hunter.io"))
    {
      if(token)
      {
        request=req.clone(
          {
            setHeaders:{
              authorization: `Bearer ${token}`
            }
          }
        );
       }
    } */
    
    return  next.handle(request).pipe(
      catchError(  
        (err:HttpErrorResponse)=>
      {
        let error = err.error;
        let title :string = "Error en el servidor comuniquese con el area de TI"

        switch (err.status)
        {
          case 400: //TODO: Es un bad Request 
          alert_error("DATOS NO CORRECTOS")
          break;
          case 401: //TODO: NO HAY TOKEN
          alert_error("NO INICIO SESION")
          this._router.navigate([''])
          break;
          case 404: //TODO: NO SE ENCONTRO EL URL
          alert_error("NO SE ENCONTRO LA PAGINA")
          break;
          case 403: //TODO: NO TIENES PERMISOS
          alert_error("SERVICIO NO ENCONTRADO")
          break;
          case 0: //TODO: NO TIENES PERMISOS
          alert_error("OCURRIO UN ERROR")
         
          break;
          case 500: //TODO: UN ERROR NO CONTROLADO
          alert("error 500")
          break;
        }
        return throwError(()=>{err})
      }
      )
    );
    
  }
}
