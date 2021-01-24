import { Component } from '@angular/core';
import { MbtaService } from './mbta.service';

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

  constructor(private mbtaService: MbtaService) {}

  ngOnInit() {

    this.mbtaService.getStop2104().subscribe(res => {
      console.log(res);
      console.log(res.data.attributes.latitude);
      console.log(res.data.attributes.longitude);
      this.latitude = res.data.attributes.latitude;
      this.longitude = res.data.attributes.longitude;
    });

    this.mbtaService.getStop2104Predicition().subscribe(res => {
      console.log(res);
      console.log(res.data[0].attributes.arrival_time);
      this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

      if (this.arrivalTime < 0) {
        this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
      }


      this.minutesAway = ((this.arrivalTime.getTime() - Date.now())/1000/60);
    });

    this.interval = setInterval(() => {

    this.mbtaService.getStop2104().subscribe(res => {
      console.log(res);
      console.log(res.data.attributes.latitude);
      console.log(res.data.attributes.longitude);
      this.latitude = res.data.attributes.latitude;
      this.longitude = res.data.attributes.longitude;
    });

    this.mbtaService.getStop2104Predicition().subscribe(res => {
      console.log(res);
      console.log(res.data[0].attributes.arrival_time);
      this.arrivalTime = new Date(res.data[0].attributes.arrival_time);

      if (this.arrivalTime < 0) {
        this.arrivalTime = new Date(res.data[1].attributes.arrival_time);
      }

      this.minutesAway = ((this.arrivalTime.getTime() - Date.now())/1000/60);

    });


  }, 10000);



  }
    
}
