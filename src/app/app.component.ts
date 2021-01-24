import { Component } from '@angular/core';
import { MbtaService } from './mbta.service';
import { BusStop } from './busStop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mbta';
  public longitude: number;
  public latitude: number;
  public arrivalTime: any;
  public minutesAway: number;
  public interval: any;
  public busRoutes: string[] = [];
  public busStops: BusStop[] = [];
  public busStop: BusStop = {
    id : 2104,
    name : 'Trapelo Road @ Bartlet'
  };


  constructor(private mbtaService: MbtaService) {}

  ngOnInit() {

    this.mbtaService.getStop2104(this.busStop.id).subscribe(res => {
      this.latitude = res.data.attributes.latitude;
      this.longitude = res.data.attributes.longitude;
    });

    this.mbtaService.getStop2104Predicition(this.busStop.id).subscribe(res => {
      this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

      if (((this.arrivalTime.getTime() - Date.now())/1000/60) < 0) {
        this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
      }
      
      this.minutesAway = ((this.arrivalTime.getTime() - Date.now())/1000/60);
    });

    this.mbtaService.getBusRoutes().subscribe(res => {
        for (var i = 0; i < res.data.length; i++)
        {
          this.busRoutes.push(res.data[i].attributes.short_name);
        }
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

      this.minutesAway = ((this.arrivalTime.getTime() - Date.now())/1000/60);

    });


  }, 30000);



  }


  public onOptionsSelected(event) {
    this.busStops = [];
    const value = event.target.value;

    this.mbtaService.getBusStops(value).subscribe(res => {

      console.log(res.data);
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
  });

  this.mbtaService.getStop2104Predicition(this.busStop.id).subscribe(res => {

    this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

    if (((this.arrivalTime.getTime() - Date.now())/1000/60) < 0) {
      this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
    }
    
    this.minutesAway = ((this.arrivalTime.getTime() - Date.now())/1000/60);
  });

 }
    
}
