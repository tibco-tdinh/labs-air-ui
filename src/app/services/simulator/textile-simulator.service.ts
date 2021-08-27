import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LogLevel, LogService } from '@tibco-tcstk/tc-core-lib';

@Injectable({
  providedIn: 'root'
})
export class TextileSimulatorService {

  constructor(private http: HttpClient,
    private logger: LogService) {
    logger.level = LogLevel.Debug;
  }

  private getURL(endpointId: string, servicePath: string): string {

    let url = `/textileSimulatorEndpoint${endpointId}${servicePath}`;
    return url;
  }

  

  videoEvent(event: any): Observable<string> {
    let url = this.getURL("1", "/pipelines/object_classification/textile_defect");

    return this.http.post<string>(url, event)
      .pipe(
        catchError(this.handleError<any>('videoEvent'))
      );
  }

  getStatistics(testId: string, filter: string): Observable<any> {

    let servicePath = `/TDD/statistics/${testId}/${filter}`
    let url = this.getURL("2", servicePath);

    console.log("Calling service get statistics with url: ", url);
    
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>('getStatistics'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('Inside the handleError function');
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logger.info(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
