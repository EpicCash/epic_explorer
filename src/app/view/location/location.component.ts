import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'leaflet.markercluster'; // Import the marker cluster library

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {
  private map;
  private locations = [];
  private markerClusterGroup: L.MarkerClusterGroup; // Create a marker cluster group

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.fetchLocationData();
  }

  private initMap(): void {
    const isMobile = window.innerWidth < 768;
    this.map = L.map('map', {
      center: [isMobile ? 50 : 30, isMobile ? 20 : -20],
      zoom: 3,
      maxBounds:  L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)) , // Disable horizontal scrolling
      bounceAtZoomLimits:true,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.markerClusterGroup = L.markerClusterGroup(); // Initialize the marker cluster group
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
      const customIcon = L.icon({
        iconUrl: "/assets/img/icons8-location-80.png",
        iconSize: [32, 32], // Adjust the icon size as needed
        iconAnchor: [16, 32], // Adjust the icon anchor as needed
      });
      const marker = L.marker([location.lat, location.lng],{ icon: customIcon });
      marker.bindPopup(location.name);
      this.markerClusterGroup.addLayer(marker); // Add marker to the cluster group
    }
  }

  private fetchLocationData(): void {
    this.http.get('https://explorer.epic.tech/epic_explorer/v1/blockchain_block/v1/peers/all').subscribe((data: any) => {
      this.locations = data.response;
      this.addMarkers();
    });
  }
}
