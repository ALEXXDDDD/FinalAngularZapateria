import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-api-maps-google',
  templateUrl: './api-maps-google.component.html',
  styleUrls: ['./api-maps-google.component.css']
})
export class ApiMapsGoogleComponent implements OnInit {
  title=''
  position={
    lat:-34.681,
    lng:-58.371
  }
  label={
    color:'red',
    text:'marca'
  }
  display : any;
  center: google.maps.LatLngLiteral = {lat: -34.681, lng: -58.371};
  zoom = 4;

  moveMap(event: google.maps.MapMouseEvent) {
    if(event.latLng!= null)
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if(event.latLng != null)
    this.display = event.latLng.toJSON();
  }
  constructor() {}
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if(event.latLng != null)
    this.markerPositions.push(event.latLng.toJSON());
  }
  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    const loader = new Loader({
      apiKey: 'AIzaSyAboUB7-NkXl-FQPhQKJPjvQWT47UAaPT8', // Asegúrate de usar tu API key correcta
      version: 'weekly',
      libraries: ['places'] // Puedes añadir más bibliotecas si lo necesitas
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
    }).catch(e => {
      console.error('Error al cargar Google Maps', e);
    });
  }
}
