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
  public busStop: BusStop;

  public stopID:number = 2104;

  constructor(private mbtaService: MbtaService) {}

  ngOnInit() {

    this.mbtaService.getStop2104(this.stopID).subscribe(res => {
      console.log(res);
      console.log(res.data.attributes.latitude);
      console.log(res.data.attributes.longitude);
      this.latitude = res.data.attributes.latitude;
      this.longitude = res.data.attributes.longitude;
    });

    this.mbtaService.getStop2104Predicition(this.stopID).subscribe(res => {
      console.log(res);
      console.log(res.data[0].attributes.arrival_time);
      this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

      if (((this.arrivalTime.getTime() - Date.now())/1000/60) < 0) {
        this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
      }
      
      this.minutesAway = ((this.arrivalTime.getTime() - Date.now())/1000/60);
    });

    this.mbtaService.getBusRoutes().subscribe(res => {

        console.log(res.data);
        for (var i = 0; i < res.data.length; i++)
        {
          //console.log(res.data[i].attributes.short_name);
          this.busRoutes.push(res.data[i].attributes.short_name);
        }

        console.log( this.busRoutes);
    });



    this.interval = setInterval(() => {

    this.mbtaService.getStop2104(this.stopID).subscribe(res => {
      console.log(res);
      console.log(res.data.attributes.latitude);
      console.log(res.data.attributes.longitude);
      this.latitude = res.data.attributes.latitude;
      this.longitude = res.data.attributes.longitude;
    });

    this.mbtaService.getStop2104Predicition(this.stopID).subscribe(res => {
      console.log(res);
      console.log(res.data[0].attributes.arrival_time);
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
    //console.log(value);

    this.mbtaService.getBusStops(value).subscribe(res => {

      console.log(res.data);
      for (var i = 0; i < res.data.length; i++)
      {
        //console.log(res.data[i].attributes.name);


        let busStop: BusStop = {
          id : res.data[i].id,
          name : res.data[i].attributes.name
        }
        

        this.busStops.push(busStop);
      }

      //console.log( this.busRoutes);
  });




 }

 public onStopOptionsSelected(event) {

  this.stopID = event.target.value;

  
  this.mbtaService.getStop2104(this.stopID).subscribe(res => {
  
    this.latitude = res.data.attributes.latitude;
    this.longitude = res.data.attributes.longitude;
  });

  this.mbtaService.getStop2104Predicition(this.stopID).subscribe(res => {
   
    this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

    if (((this.arrivalTime.getTime() - Date.now())/1000/60) < 0) {
      this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
    }
    
    this.minutesAway = ((this.arrivalTime.getTime() - Date.now())/1000/60);
  });





 }
    
}
