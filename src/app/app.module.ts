import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { NotFoudComponent } from './pages/not-foud/not-foud.component';
import { WelcomeComponent } from './pages/welcome/welcome.component'
import { AuthInterceptor } from './services/auth.interceptor';
import { WelcomeHeaderComponent } from './pages/welcome/welcome-header/welcome-header.component';
import { SinPermisoComponent } from './pages/sinPermiso/sin-permiso/sin-permiso.component';
import { MantRolRegisterMultipleComponent } from './modules/matenimiento/component/rol/mant-rol-register-multiple/mant-rol-register-multiple.component';
import { ServiceRolComponent } from './service-rol/service-rol.component';
import { CarritoComprasComponent } from './Ventas/component/carrito-compras/carrito-compras.component';
import { ListarDetalleComponent } from './Ventas/component/listar-detalle/listar-detalle.component';
import { ButtonModule } from 'primeng/button';
import { ProductoComponent } from './Ventas/component/vistas/producto/producto.component';
import { VistZapatillaComponent } from './Ventas/component/vistas/vist-zapatilla/vist-zapatilla.component';
import { VistModelosComponent } from './Ventas/component/vistas/vist-modelos/vist-modelos.component';
import { VistEmpresaComponent } from './Ventas/component/vistas/vist-empresa/vist-empresa.component';
import { VistContactoComponent } from './Ventas/component/vistas/vist-contacto/vist-contacto.component';
import { VistProductoComponent } from './Ventas/component/vistas/vist-producto/vist-producto.component';
import { VistBailarinaComponent } from './Ventas/component/vistas/mod-bailarinas/vist-bailarina/vist-bailarina.component';
import { VistaZapatoComponent } from './Ventas/component/vistas/vist-zapato/vista-zapato/vista-zapato.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './modules/template/template-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { EnvioDomicilioComponent } from './Ventas/component/vistas/envio-domicilio/envio-domicilio.component';
import { PerfilListComponent } from './pages/perfil/perfil-list/perfil-list.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { PasarelaModuleModule } from './Pasarela/pasarela-module/pasarela-module.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';
import { ChatPagesComponent } from './chat-bot/chat-pages/chat-pages.component';
import { WelcomeBodyComponent } from './pages/welcome/welcome-body/welcome-body/welcome-body.component';
import { InicioSidebarComponent } from './modules/matenimiento/component/inicio-sidebar/inicio-sidebar.component';
import { ApiMapsGoogleComponent } from './Ventas/component/maps-google/api-maps-google/api-maps-google.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    EnvioDomicilioComponent,
    NotFoudComponent,
    VistEmpresaComponent,
    VistContactoComponent,
    
    ProductoComponent,
    WelcomeComponent,
    WelcomeHeaderComponent,
    ChatPagesComponent,
    VistBailarinaComponent,
    VistZapatillaComponent,
    ListarDetalleComponent,
    CarritoComprasComponent,
    SinPermisoComponent,
    ServiceRolComponent,
    VistaZapatoComponent,
    EnvioDomicilioComponent,
    PerfilListComponent,
    WelcomeBodyComponent,
    ApiMapsGoogleComponent
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    GoogleMapsModule,
    ButtonModule,
    ModalModule.forRoot(),
    AppRoutingModule,
    /**
     * TODO: PARA USUAR DOBLE BINDING    
     */
    FormsModule,
    
  
    OAuthModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true} //Configuracion de angular 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
