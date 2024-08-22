import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-sidebar',
  templateUrl: './template-sidebar.component.html',
  styleUrls: ['./template-sidebar.component.css']
})
export class TemplateSidebarComponent implements OnInit {
  ngOnInit(): void {
    this.rellenarMenu()
  }


  meny:any[]=[]
  rellenarMenu()
  {
    
    let rolID = sessionStorage.getItem("rolId")
    let nombreRol = sessionStorage.getItem("nombreRol")
    switch (nombreRol)
    {
      
      case "Administrador":
        this.meny =[
        {



          name:"Administracion", target:"TargetMantenimiento",
          subMenu:[
                  
                {name:"Roles de la Empresa ",url:"mantenimiento/rol", incon:"fas fa-card"},
                {name:"Empleados",url:"mantenimiento/empleado", incon:"fas fa-card"},
                {name:"Usuarios",url:"mantenimiento/usuario", incon:"fas fa-users"},
                    
                ]
                
              },
             
              {
                name:"Venta", target:"TargetVenta",incon:"fas fa-users",
                subMenu:[
                  
                    {name:"Clientes",url:"mantenimiento/cliente", incon:"fas fa-users"},
                    {name:"Ordenes",url:"mantenimiento/orden", incon:"fa-solid fa-bag-shopping"},
                    {name:"Produccion",url:"mantenimiento/produccion", incon:"fa-solid fa-warehouse"} 
                ]
              },
              {
                name:"Produccion", target:"TargetProduccion",incon:"fas fa-edit",
                subMenu:[
                    {name:"productos",url:"mantenimiento/producto", incon:"fa-solid fa-warehouse"}, 
                    {name:"Ingreso de Producto",url:"mantenimiento/produccion", incon:"fas fa-plus"}, 
                   
                    {name:"Modelos de Zapatos ",url:"mantenimiento/modelo", incon:"fa-solid fa-bag-shopping"},
                    {name:"Proveedors ",url:"mantenimiento/proveedor", incon:"fas fa-users"}
                ]
              },
              {
                name:"Materiales", target:"TargetProduccion1",incon:"fas fa-edit",
                subMenu:[
                    {name:"Salida de  Materiales",url:"mantenimiento/salidaMaterial", incon:"fa-solid fa-warehouse"},
                    {name:"Materiales",url:"mantenimiento/material", incon:"fa-solid fa-warehouse"},
                    {name:"Ingreso de Materiales",url:"mantenimiento/producto", incon:"fa-solid fa-warehouse"}, 
                ]
              },
              {
                name:"Informes", target:"TargetInformes",incon:"fas fa-edit",
                subMenu:[
                    {name:"Informes Materiales",url:"mantenimiento/material", incon:"fa-solid fa-warehouse"},
                    {name:"Informes Productos",url:"mantenimiento/producto", incon:"fa-solid fa-bag-shopping"}, 
                    {name:"Informes Produccion ",url:"mantenimiento/modelo", incon:"fa-solid fa-bag-shopping"},
                    {name:"Informes Empleados ",url:"mantenimiento/proveedor", incon:"fa-solid fa-bag-shopping"},
                    {name:"Informes Ventas ",url:"mantenimiento/modelo", incon:"fa-solid fa-bag-shopping"}
                ]
              }
              
            ]
      break;
      case "Area de Ventas":
        this.meny =[
        {
          name:"Produccion", target:"TargetMantenimiento",
          subMenu:[
                  
            
            {name:"Clientes",url:"mantenimiento/cliente", incon:"fas fa-users"},
            {name:"Ordenes",url:"mantenimiento/orden", incon:"fa-solid fa-bag-shopping"},
            {name:"Produccion",url:"mantenimiento/produccion", incon:"fa-solid fa-warehouse"} 
                    
                ]
                
              },
              
              {
                name:"Produccion", target:"TargetProduccion",incon:"fas fa-edit",
                subMenu:[
                    {name:"Materiales",url:"mantenimiento/material", incon:"fa-solid fa-warehouse"},
                    {name:"productos",url:"mantenimiento/producto", incon:"fa-solid fa-warehouse"}, 
                    {name:"Ingreso de Producto",url:"mantenimiento/producto", incon:"fas fa-plus"}, 
                   
                    {name:"Modelos de Zapatos ",url:"mantenimiento/modelo", incon:"fa-solid fa-bag-shopping"},
                    {name:"Proveedors ",url:"mantenimiento/proveedor", incon:"fas fa-users"}
                ]
              }
            ]
      break;
    }
  }
}
