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



  constructor(private mbtaService: MbtaService) {}

  ngOnInit() {
    this.mbtaService.getStop2104().subscribe(res => {
      console.log(res);
      console.log(res.data.attributes.latitude);
      console.log(res.data.attributes.longitude);
      this.latitude = res.data.attributes.latitude;
      this.longitude = res.data.attributes.longitude;
    });
  }
    
}
