import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { NotFoudComponent } from './pages/not-foud/not-foud.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './guard/auth.guard';
import { ProductoComponent } from './Ventas/component/vistas/producto/producto.component';
import { VistContactoComponent } from './Ventas/component/vistas/vist-contacto/vist-contacto.component';
import { VistEmpresaComponent } from './Ventas/component/vistas/vist-empresa/vist-empresa.component';
import { VistBailarinaComponent } from './Ventas/component/vistas/mod-bailarinas/vist-bailarina/vist-bailarina.component';
import { VistZapatillaComponent } from './Ventas/component/vistas/vist-zapatilla/vist-zapatilla.component';
import { CarritoComprasComponent } from './Ventas/component/carrito-compras/carrito-compras.component';
import { PerfilListComponent } from './pages/perfil/perfil-list/perfil-list.component';
import { VistaZapatoComponent } from './Ventas/component/vistas/vist-zapato/vista-zapato/vista-zapato.component';

const routes: Routes = [
  //Routeo
  {
    path:'',component:WelcomeComponent //Si es vacio dirigite a este componente

  },
  // Utilizacion de Laysi Loding 
  {
    path:'auth',loadChildren:()=>import("./modules/auth/auth.module").then(x=>x.AuthModule) //Si es vacio dirigite a este componente

  },
  
  {
    path:'pasarela',
    canActivate:[authGuard]
    ,loadChildren:()=>import("./Pasarela/pasarela-module/pasarela-module.module").then(x=>x.PasarelaModuleModule) //Si es vacio dirigite a este componente

  },
  {
    path:'lista_productos',component:ProductoComponent //Si es vacio dirigite a este componente

  },
  {
    path:'lvistaBailarina',component:VistBailarinaComponent //Si es vacio dirigite a este componente

  },
  {
    path:'vistaZapatillas',component:VistZapatillaComponent //Si es vacio dirigite a este componente

  },
  {
    path:'vistaZapatos',component:VistaZapatoComponent //Si es vacio dirigite a este componente

  },
  
  {
    path:'empresa',component:VistEmpresaComponent //Si es vacio dirigite a este componente

  },
  {
    path:'contacto',component:VistContactoComponent //Si es vacio dirigite a este componente

  },
  {
    path:'dasboard',
    canActivate:[authGuard]
    ,loadChildren:()=>import("./modules/template/template.module").then(x=>x.TemplateModule) //Si es vacio dirigite a este componente

  },
  {
    canActivate: [  authGuard],
    path:'carrito',
    component:CarritoComprasComponent //Si es vacio dirigite a este componente

  },
  {
    canActivate: [  authGuard],
    path:'perfil',
    component:PerfilListComponent //Si es vacio dirigite a este componente

  },
  {
    path:'prueba',component:PruebaComponent //Si es vacio dirigite a este componente

  },
  {
    path:'404',component:NotFoudComponent //Si es vacio dirigite a este componente
    
  },
  {
    path:'login-cb',component:ProductoComponent //Si es vacio dirigite a este componente

  },
  /*{
    {
      path:'login-cb',component:ProductoComponent //Si es vacio dirigite a este componente
   
    },
    path:'**',redirectTo:'/'
    } */
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
// imports: [RouterModule.forRoot(routes, {useHash:true})],
exports: [RouterModule]
})
export class AppRoutingModule { }
