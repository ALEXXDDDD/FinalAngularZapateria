import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CarritoItem } from 'src/app/modules/matenimiento/models/carritoItem/carritoItem.model';
import { RequestActualizacionDireccion } from 'src/app/modules/matenimiento/models/cliente/request-actualizacionUsuario.model';
import { UsuarioService } from 'src/app/modules/matenimiento/service/usuario/usuario.service';
import { ActuDirecService } from 'src/app/modules/matenimiento/service/actuDirec/actu-direc.service';
import { alert_sucess } from 'src/app/funcionts/general.funcionts';

@Component({
  selector: 'app-envio-domicilio',
  templateUrl: './envio-domicilio.component.html',
  styleUrls: ['./envio-domicilio.component.css']
})
export class EnvioDomicilioComponent implements OnInit {
  @Input() accion: number = 0;
  @Output() closeModalEmmit = new EventEmitter<boolean>();
  requestDireccion : RequestActualizacionDireccion = new RequestActualizacionDireccion()
  myForm: FormGroup;
  modalRef?: BsModalRef;
  direccionEnvio: string = ''; 
  geocoder = new google.maps.Geocoder(); // Dirección obtenida del mapa
  map!: google.maps.Map;  // Objeto del mapa de Google
  
  constructor(
    private fb: FormBuilder,
    
    private _router: Router,
    private _actuaDireccion: ActuDirecService,
    private _usuarioService: UsuarioService
  ) {
    this.myForm = this.fb.group({
      direccion: [null, Validators.required],
      nombrePersona: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    // Aquí cargamos el mapa cuando el componente es inicializado
    this.initMap();
  }

  initMap(): void {
  //   const mapElement = document.getElementById("mapa");
    
  //   if (mapElement) {
  //     // Solo procede si el elemento existe
  //     const map = new google.maps.Map(mapElement as HTMLElement, {
  //       center: { lat: -11.77652359008789, lng: -75.49992370605469 },
  //       zoom: 14,
  //       mapId: "DEMO_MAP_ID"
  //     });
  
  //     new google.maps.Marker({
  //       position: { lat: -11.77652359008789, lng: -75.49992370605469 },
  //       map,
  //       title: "Mi ubicación"
  //     });
  //   } else {
  //     console.error("El elemento con id 'mapa' no se encontró.");
  //   }
  // }
  const mapElemnt = document.getElementById("mapa");
  if(mapElemnt)
  {
    this.map = new google.maps.Map(mapElemnt as HTMLElement ,{
      center: { lat: -11.77652359008789, lng: -75.49992370605469 },
      zoom:14,
      mapId:"DEMO_MAP_ID"
    })
  }
    new google.maps.Marker(
      {
      position: { lat: -11.77652359008789, lng: -75.49992370605469 },
        map: this.map,
        title: "Mi ubicación"
      }
    )
    this.map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        // Llamar a la función para obtener la dirección
        this.obtenerDireccion(e.latLng);



      }
    }); 
  
   
  }
  getCloseModalEmmit(res: boolean): void {
    this.modalRef?.hide();
    if (res) {
      // Aquí puedes realizar acciones adicionales si es necesario
    }
  }
  obtenerDireccion(latLng: google.maps.LatLng): void {
    
    this.geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
        this.direccionEnvio = results[0]?.formatted_address || 'Dirección no disponible';
  
        // Guardar la dirección en localStorage
        localStorage.setItem('direccionEnvio', this.direccionEnvio);
  
        // Mostrar la dirección en la consola o usarla en la UI
        const idUsuString = sessionStorage.getItem('idUsuario');
        const idUsu = idUsuString ? +idUsuString : null;
      
        if(idUsu)
        {
          debugger
          this.requestDireccion.idUsuario = idUsu
          this.requestDireccion.direccion = this.direccionEnvio
          this.actualizarDireccion(idUsu,this.direccionEnvio)
          this.getCloseModalEmmit(true)
        }



      } else {
        console.error('No se pudo obtener la dirección. Estado: ', status);
      }
    });
  }
  actualizarDireccion(id:number , direccion:string)
  {
    
    this._actuaDireccion.update(this.requestDireccion).subscribe(
      {
        next:(data:RequestActualizacionDireccion)=>{
          alert_sucess("Se ha Actualizado correctamente")
        },
        
          error: ()=> {
            alert("Ocurrio un error")
          },
          complete: ()=> {
            this.getCloseModalEmmit(true)

        }
      }
    )
  }
}
