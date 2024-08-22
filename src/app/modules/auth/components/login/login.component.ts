import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { RequestLogin } from '../../models/login-request.models';
import { ResponseLogin } from 'src/app/models/login-response.models';
import { ActivatedRoute, Router } from '@angular/router';
import { alert_error, alert_sucess } from 'src/app/funcionts/general.funcionts';
import { LoadStateEnum } from 'src/app/modules/matenimiento/models/core/utils/load-enum';
import { AuthGoogleService } from 'src/app/services/google/auth-goggle-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  frmLoadSt = LoadStateEnum.None;
  loadStateEnum = LoadStateEnum;
  loginForm : FormGroup
  loginRequest : RequestLogin = new RequestLogin()
 
  constructor(
    
    private fb: FormBuilder,
    private oauthService: AuthGoogleService,
    private _authService:AuthService, 
    private _router:Router,
    private route: ActivatedRoute,
  )
  {
    this.loginForm = this.fb.group(
      {
        usuario:[null,[Validators.required]],
        parteViene:["Sistema",[Validators.required]],
        password:[null,[Validators.required]]
      }
    )

  }
  ngOnInit(): void {
 
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const urlParams = new URLSearchParams(fragment);
        const idToken = urlParams.get('id_token');
        const accessToken = urlParams.get('access_token');

        if (idToken) {
          // Validar el id_token en el backend
          this.oauthService.validateToken(idToken).subscribe(response => {
            console.log('Token validado:', response);
            // Manejar la lógica después de la validación del token
          }, (error: any) => {
            console.error('Error al validar el token:', error);
          });
        } else {
          console.error('No se encontró id_token en el fragmento de la URL');
        }
      } else {
        console.error('No se encontró el fragmento en la URL');
      }
    });
  }
  save(name: string, lastName: string) {
    this.frmLoadSt = LoadStateEnum.Loading;

    // envio al servido
    setTimeout(() => {
      // guargador correcto
      alert('Se guardo');
      this.frmLoadSt = LoadStateEnum.Success;
    }, 4000);
  }

  login ()
  {
   
   /*  console.log(this.loginForm.getRawValue()) */
    this.loginRequest = this.loginForm.getRawValue()
    this._authService.login(this.loginRequest).subscribe(
      {
        next: (data:ResponseLogin) => {
          this._router.navigate(['dasboard/mantenimiento/producto'])
          console.log(data) 
          // routeamos al dahboard
          //Alamcenamos el token Valores Del Usuario Ingresadp
          if(data.success)
          {
            alert_sucess("Iniciaste Sesion Correctamente")
            // debugger;
            if(data.nameRol=="Cliente")
              {
                // debugger
                this._router.navigate([''])
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("nombrePersona",data.persona.nombrePersona);
                sessionStorage.setItem("idUsuario",data.vwUsuario
                .idUsuario.toString());
                sessionStorage.setItem("usuario",data.vwUsuario.usuario);
                sessionStorage.setItem("nombreRol",data.nameRol);
             
              }
              if(data.nameRol=="Administador")
                {
                  sessionStorage.setItem("token", data.token);
                  sessionStorage.setItem("nombrePersona",data.persona.nombrePersona);
                  sessionStorage.setItem("idUsuario",data.vwUsuario
                  .idUsuario.toString());
                  sessionStorage.setItem("usuario",data.vwUsuario.usuario);
                  sessionStorage.setItem("nombreRol",data.nameRol);
               
                  this._router.navigate(['dasboard/mantenimiento/producto'])
                }
                if(data.nameRol=="Vendedor")
                  {
                    // debugger;
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("nombrePersona",data.persona.nombrePersona);
                    sessionStorage.setItem("idUsuario",data.vwUsuario
                    .idUsuario.toString());
                    sessionStorage.setItem("usuario",data.vwUsuario.usuario);
                    sessionStorage.setItem("nombreRol",data.nameRol);
                    this._router.navigate(['dasboard'])
                  }
            // debugger;
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("nombrePersona",data.persona.nombrePersona);
            sessionStorage.setItem("idUsuario",data.vwUsuario
            .idUsuario.toString());
            sessionStorage.setItem("usuario",data.vwUsuario.usuario);
            sessionStorage.setItem("nombreRol",data.nameRol);
         
            
          }
          else{
            alert_error("No existe tu usuario por favor registrese")
            this._router.navigate(['register'])
            return;
          }
        },
        error: (error) => {
          alert_error("Datos Icorrectos")
          this._router.navigate(['login'])
        },
        complete: () => {}
      }
    )

  }
  loginGoogle()
  {
 
    this.oauthService.loginGoogle()
  
    // this.login()
    // this.route.fragment.subscribe(fragment => {
    //   if (fragment) {
    //     const urlParams = new URLSearchParams(fragment);
    //     const idToken = urlParams.get('id_token');
    //     const accessToken = urlParams.get('access_token');

    //     if (idToken) {
    //       // Validar el id_token en el backend
    //       this.oauthService.validateToken(idToken).subscribe(response => {
    //         console.log('Token validado:', response);
    //         // Manejar la lógica después de la validación del token
    //       }, (error: any) => {
    //         console.error('Error al validar el token:', error);
    //       });
    //     } else {
    //       console.error('No se encontró id_token en el fragmento de la URL');
    //     }
    //   } else {
    //     console.error('No se encontró el fragmento en la URL');
    //   }
    // });
  
  }
}
