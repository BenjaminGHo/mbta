import { Component, ViewChild } from '@angular/core';
import { MbtaService } from './mbta.service';
import { BusStop } from './busStop';
import { BusRoute } from './busRoute';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mbta';
  public longitude: number = -71.180216;
  public latitude: number = 42.382468;
  public arrivalTime: Date;
  public minutesAway: string;
  public interval: any;
  public busRoutes: BusRoute[] = [];
  public busStops: BusStop[] = [];
  public busStop: BusStop = {
    id : 2104,
    name : 'Trapelo Road @ Bartlet'
  };

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  constructor(private mbtaService: MbtaService) {}

  ngOnInit() {

    // create google map
    this.createGoogleMap();

    this.mbtaService.getStop2104(this.busStop.id).subscribe(res => {
      this.latitude = res.data.attributes.latitude;
      this.longitude = res.data.attributes.longitude;
    });

    this.mbtaService.getStop2104Predicition(this.busStop.id).subscribe(res => {
      this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

      if (((this.arrivalTime.getTime() - Date.now())/1000/60) < 0) {
        this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
      }
      
      this.minutesAway = this.calculateMinutesAway(this.arrivalTime);
    });


    this.mbtaService.getBusRoutes().subscribe(res => {
        const busRoutes: BusRoute[] = [];

        for (var i = 0; i < res.data.length; i++)
        {
          const busRoute: BusRoute = {
            id: res.data[i].attributes.short_name,
            name: res.data[i].attributes.long_name
          }
          busRoutes.push(busRoute);
        }
        this.busRoutes = busRoutes;
    });

    this.interval = setInterval(() => {
      this.mbtaService.getStop2104(this.busStop.id).subscribe(res => {
        this.latitude = res.data.attributes.latitude;
        this.longitude = res.data.attributes.longitude;
      });

      this.mbtaService.getStop2104Predicition(this.busStop.id).subscribe(res => {
        this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

        if (((this.arrivalTime.getTime() - Date.now())/1000/60) < 0) {
          this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
        }

        this.minutesAway = this.calculateMinutesAway(this.arrivalTime);

      });
    }, 30000);
  }

  public createGoogleMap() {
    const mapProperties = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
    this.addMarker(this.map);
  }

  public addMarker(map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
      position: {lat: this.latitude, lng: this.longitude},
      map: map,
    });
  }

  public onOptionsSelected(event) {
    this.busStops = [];
    const value = event.target.value;

    this.mbtaService.getBusStops(value).subscribe(res => {
      
      for (var i = 0; i < res.data.length; i++)
      {
        let busStop: BusStop = {
          id : res.data[i].id,
          name : res.data[i].attributes.name
        }
        this.busStops.push(busStop);
      }
    });
  }

  public onStopOptionsSelected(event) {
    for (var i = 0; i < this.busStops.length; i++)
    {
      if (this.busStops[i].id == event.target.value) {
        this.busStop.id = event.target.value;
        this.busStop.name = this.busStops[i].name;

      }
    }

    this.mbtaService.getStop2104(this.busStop.id).subscribe(res => {

      this.latitude = res.data.attributes.latitude;
      this.longitude = res.data.attributes.longitude;

      this.createGoogleMap();

    });

    this.mbtaService.getStop2104Predicition(this.busStop.id).subscribe(res => {

      this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

      if (((this.arrivalTime.getTime() - Date.now())/1000/60) < 0) {
        this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
      }
      
      this.minutesAway = this.calculateMinutesAway(this.arrivalTime);
    });

  }

  public calculateMinutesAway(arrivalTime: Date) {
    const totalSeconds =  Math.floor((arrivalTime.getTime() - Date.now())/1000);
    const minutes = Math.floor(totalSeconds/60);
    const seconds = totalSeconds - (minutes * 60);

    if (seconds < 10) {
      return minutes + ":0" + seconds;
    }
    return minutes + ":" + seconds;
  }
    
}
