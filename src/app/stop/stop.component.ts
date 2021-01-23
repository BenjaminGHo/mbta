import { Component, OnInit } from '@angular/core';
import { MbtaService } from '../mbta.service';

@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html',
  styleUrls: ['./stop.component.css']
})
export class StopComponent implements OnInit {

  constructor(private mbtaService: MbtaService) { }

  ngOnInit(): void {
  }

}
