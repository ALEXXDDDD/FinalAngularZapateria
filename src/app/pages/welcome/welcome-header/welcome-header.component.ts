import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-header',
  templateUrl: './welcome-header.component.html',
  styleUrls: ['./welcome-header.component.css']
})
export class WelcomeHeaderComponent implements OnInit {
  ngOnInit(): void {
    this.rellenarMenu()



  }


  meny:any[]=[]
  rellenarMenu()
  {
    
    let rolID = sessionStorage.getItem("rolId")
    let nombreRol = sessionStorage.getItem("nombreRol")
    // debugger;
    if(nombreRol==null)
    {
      
      
      
          this.meny =[
          {
            name:"Entrada", target:"TargetEntrada",
            subMenu:[
              {name:"Carrito ",url:"carrito", incon:"fa fa-fw fa-search text-dark mr-2"},
              {name:"Login",url:"auth", incon:"fa fa-fw fa-user text-dark mr-3"},                     
                  ]
                  
                },
                  
          ]
    
    }
    
    // debugger;
    switch (nombreRol)
    {
      
      case "Administrador":
        this.meny =[
        {
          name:"Administracion", target:"TargetMantenimiento",
          subMenu:[
                  
                {name:"Cuenta ",url:"/perfil", incon:"fas fa-card"},
                {name:"Dasboard",url:"dasboard/mantenimiento/inicioSidebar", incon:"fas fa-card"},                    
              ]           
              }        
            ]
      break;  
      case "Cliente":
        this.meny =[
        {
          name:"Cliente", target:"TargetCliente",
          subMenu:[
            {name:"Carrito ",url:"/carrito", incon:"fa fa-fw fa-search text-dark mr-2"},
                
                ]
                
              },
          {
            name:"Cuenta", target:"TargetCuenta",
            subMenu:[
              {name:"Cuenta",url:"/perfil", incon:"fa fa-fw fa-user text-dark mr-3"},     
              ]
          }             
        ]
      break;
    }
  }
}