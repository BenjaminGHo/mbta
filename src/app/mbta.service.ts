import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MbtaService {

  private stopUrl = 'https://api-v3.mbta.com/stops/2104';  // URL to web api

  constructor(private http: HttpClient) { }


  getStop2104(): Observable<any> {
    return this.http.get<any>(this.stopUrl).pipe(
      catchError(this.handleError<any>('getStop', [])));
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
