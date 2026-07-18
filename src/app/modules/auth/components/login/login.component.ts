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
  save(name: string, lastName: string) {
    this.frmLoadSt = LoadStateEnum.Loading;

    const timeoutId = window.setTimeout(() => {
      this.frmLoadSt = LoadStateEnum.Error;
      alert('Tiempo de espera excedido');
    }, 60000);

    try {
      // envio al servidor
      window.setTimeout(() => {
        clearTimeout(timeoutId);
        // guardado correcto
        alert('Se guardo');
        this.frmLoadSt = LoadStateEnum.Success;
      }, 4000);
    } catch (error) {
      clearTimeout(timeoutId);
      this.frmLoadSt = LoadStateEnum.Error;
      alert('Ocurrió un error al guardar');
    }
  }

  login ()
  {
    this.frmLoadSt = LoadStateEnum.Loading;
    this.loginRequest = this.loginForm.getRawValue();

    this._authService.login(this.loginRequest).subscribe(
      {
        next: (data:ResponseLogin) => {
          console.log(data);

          if(data.success)  {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("nombrePersona", data.persona.nombrePersona);
            sessionStorage.setItem("idUsuario", data.vwUsuario.idUsuario.toString());
            sessionStorage.setItem("usuario", data.vwUsuario.usuario);
            sessionStorage.setItem("nombreRol", data.nameRol);

            if(data.nameRol === "Cliente") {
              this._router.navigate(['']);
            } else if(data.nameRol === "Administador") {
              this._router.navigate(['dasboard/mantenimiento/producto']);
            } else if(data.nameRol === "Vendedor") {
              this._router.navigate(['dasboard']);
            } else {
              this._router.navigate(['dasboard']);
            }

            this.frmLoadSt = LoadStateEnum.Success;
          }
          else{
            this.frmLoadSt = LoadStateEnum.Error;
            this.loginForm.reset({
              usuario: '',
              parteViene: 'Sistema',
              password: ''
            });
            setTimeout(() => {
              this.frmLoadSt = LoadStateEnum.None;
            }, 1500);
            return;
          }
        },
        error: (error) => {
          this.frmLoadSt = LoadStateEnum.Error;
          this.loginForm.reset({
            usuario: '',
            parteViene: 'Sistema',
            password: ''
          });
          setTimeout(() => {
            this.frmLoadSt = LoadStateEnum.None;
          }, 1500);
        },
        complete: () => {}
      }
    )
  }
  // private initializeGoogleSignIn(): void {
  //   (window as any).onload = () => {
  //     (window as any).google.accounts.id.initialize({
  //       client_id: "818272992678-0n17gkh83hg7vh176r94rrigdcuqql8i.apps.googleusercontent.com",
  //       callback: this.handleCredentialResponse.bind(this)
  //     });

  //     (window as any).google.accounts.id.renderButton(
  //       document.getElementById("buttonDiv"),
  //       { theme: "outline", size: "large" }  // atributos de personalización
  //     );

  //     (window as any).google.accounts.id.prompt(); // también muestra el diálogo de One Tap
  //   };
  // }

  // private handleCredentialResponse(response: any): void {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   // Aquí puedes manejar el token JWT como necesites
  // }
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
  //     this.user = user;
  //     console.log(user);
  //   }).catch(error => {
  //     console.error('Error en la autenticación con Google:', error);
  //   });
  // }

  // signInWithFacebook(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
  //     this.user = user;
  //     console.log(user);
  //   }).catch(error => {
  //     console.error('Error en la autenticación con Facebook:', error);
  //   });
  // }

  // signOut(): void {
  //   this.authService.signOut().then(() => {
  //     this.user = null;
  //   }).catch(error => {
  //     console.error('Error al cerrar sesión:', error);
  //   });
  // }

  // loginGoogle()
  // {
 
  //   this.oauthService.loginGoogle()
  
  private initializeGoogleSignIn(): void {
    (window as any).onload = () => {
      (window as any).google.accounts.id.initialize({
        client_id: "818272992678-cacnetaor3df10ftd9ldih4ft588ajnb.apps.googleusercontent.com", // Reemplaza con tu propio client_id
        callback: this.handleCredentialResponse.bind(this)
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("buttonDiv"), 
        { theme: "outline", size: "large", logo_alignment: "center" } // Personalización del botón
      );

      (window as any).google.accounts.id.prompt(); // Opción para mostrar el diálogo de One Tap
    };
  }

  private handleCredentialResponse(response: any): void {
  }
  
  // }
}
