import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public userinfo = {};
  public searched = false;
  public location = {
    latitude: 9.867769,
    longitude: -83.904424
  };
  public map;

  constructor() { }

  ngOnInit() {
    this.updateMap(this.location.latitude, this.location.longitude);
  }

  public search() {
    this.searched = true;
  }

  private updateMap(lat, lng) {
    this.location = {
      latitude: lat,
      longitude: lng
    };
    console.log('Update', this.location, lat, lng);
    this.map = document.getElementById('map-canvas');

    const myLatlng = new google.maps.LatLng(this.location.latitude, this.location.longitude);
    const mapOptions = {
      zoom: 12,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        { 'featureType': 'administrative', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#444444' }] },
        { 'featureType': 'landscape', 'elementType': 'all', 'stylers': [{ 'color': '#f2f2f2' }] },
        { 'featureType': 'poi', 'elementType': 'all', 'stylers': [{ 'visibility': 'on' }] },
        { 'featureType': 'road', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'lightness': 45 }] },
        { 'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{ 'visibility': 'simplified' }] },
        { 'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] },
        { 'featureType': 'transit', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] },
        { 'featureType': 'water', 'elementType': 'all', 'stylers': [{ 'color': '#5e72e4' }, { 'visibility': 'on' }] }]
    };

    this.map = new google.maps.Map(this.map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: 'Marker!'
    });

    google.maps.event.addListener(marker, 'click', function () {
    });
  }

}
