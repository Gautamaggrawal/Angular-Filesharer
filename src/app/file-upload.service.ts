import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  apiUrl = 'https://fileexchangerbackend.herokuapp.com/api/upload/';

  constructor(private http: HttpClient) { }



    getFileList(){
   var access=localStorage.getItem('access')
   const httpOptions = { headers: new HttpHeaders({
    'Authorization': 'Bearer ' + access,
    'Content-Type': 'application/json' 
  }) };  
   return this.http.get<any>('https://fileexchangerbackend.herokuapp.com/api/Listfiles/',httpOptions);  
  }







  SearchUser(searchformdata){
var access=localStorage.getItem('access')
  console.log(searchformdata);
   const httpOptions = { headers: new HttpHeaders({
    'Authorization': 'Bearer ' + access,
    'Content-Type': 'application/json' 
  }) };  
   return this.http.post<any>('https://fileexchangerbackend.herokuapp.com/api/searchuser/',{"name":searchformdata},httpOptions);  
  }

  upload(formData) {
    return this.http.post<any>(`${this.apiUrl}`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event =>this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {

      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);

      case HttpEventType.Response:
        return this.apiResponse(event);

      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    console.log(percentDone);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

}
