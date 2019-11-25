import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  public supermarket = {
    localName: 'Walmart',
    address: 'De la Basílica de los Ángeles 800m camino a Paraíso frente a la Bomba Los Ángeles, 10, Provincia de Cartago',
    phone: '1-800-925-6278',
    schedule: '9:00am-10:00pm',
    website: 'https://www.walmart.com/',
    rating: 0
  };
  public map;

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateMap(this.location.latitude, this.location.longitude);
  }

  public save(isValid, info) {
    if (isValid && this.searched) {
      this.showMsg('Success!', 'Supermarket was added', 'success');
      this.router.navigateByUrl('/employee/view-supermarkets');
    }
  }

  public search() {
    this.searched = true;
  }

  private showMsg(msgTitle, msg, type) {
    Swal.fire(msgTitle, msg, type);
  }

  private updateMap(lat, lng) {
    this.location = {
      latitude: lat,
      longitude: lng
    };

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
