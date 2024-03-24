import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
//import * as L from 'leaflet';
//import 'leaflet.markercluster'; // Import the marker cluster library
declare var require: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})


export class LocationComponent implements AfterViewInit {
  isBrowser: boolean;
  private L = null;
  private map;
  private locations = [];
  private markerClusterGroup = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.L = require('leaflet'); require('leaflet.markercluster');
      this.initMap();
      this.fetchLocationData();
    }
  }

  private initMap(): void {
    const isMobile = window.innerWidth < 768;
    this.map = this.L.map('map', {
      center: [isMobile ? 50 : 30, isMobile ? 20 : -20],
      zoom: 3,
      maxBounds:  this.L.latLngBounds(this.L.latLng(-90, -180), this.L.latLng(90, 180)) , // Disable horizontal scrolling
      bounceAtZoomLimits:true,
    });

    const tiles = this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.markerClusterGroup = this.L.markerClusterGroup(); // Initialize the marker cluster group
    this.markerClusterGroup.addTo(this.map); // Add it to the map
  }

  private addMarkers(): void {
    const arrayOfLoc = this.locations
      .map(e => {
        if (e && e.geo && e.geo.ll && e.geo.city) {
          return { lat: e.geo.ll[0], lng: e.geo.ll[1], name: e.geo.city };
        }
        return null;
      })
      .filter(e => e !== null);

    for (const location of arrayOfLoc) {
      const customIcon = this.L.icon({
        iconUrl: "/assets/img/icons8-location-80.png",
        iconSize: [32, 32], // Adjust the icon size as needed
        iconAnchor: [16, 32], // Adjust the icon anchor as needed
      });
      const marker = this.L.marker([location.lat, location.lng],{ icon: customIcon });
      marker.bindPopup(location.name);
      this.markerClusterGroup.addLayer(marker); // Add marker to the cluster group
    }
  }

  private fetchLocationData(): void {
    this.http.get('/epic_explorer/v1/blockchain_block/v1/peers/all').subscribe((data: any) => {
      this.locations = data.response;
      this.addMarkers();
    });
  }
}
