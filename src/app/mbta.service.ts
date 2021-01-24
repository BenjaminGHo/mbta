import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MbtaService {

  private stopUrl = 'https://api-v3.mbta.com/stops/2104';  // URL to web api
  private stopPredictionUrl = 'https://api-v3.mbta.com/predictions?filter[stop]=2104';
  private getBusRoutesUrl = 'https://api-v3.mbta.com/routes?filter[type]=3';
  private getBusStopsUrl= 'https://api-v3.mbta.com/stops?filter[route]='

  constructor(private http: HttpClient) { }


  getStop2104(): Observable<any> {
    return this.http.get<any>(this.stopUrl).pipe(
      catchError(this.handleError<any>('getStop', [])));
  }

  getStop2104Predicition(): Observable<any> {
    return this.http.get<any>(this.stopPredictionUrl);
  }

  getBusRoutes(): Observable<any> {
    return this.http.get<any>(this.getBusRoutesUrl);
  }

  getBusStops(route: number): Observable<any> {
    return this.http.get<any>(this.getBusStopsUrl + route);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
