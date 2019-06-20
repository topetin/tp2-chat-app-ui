import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import { catchError } from 'rxjs/operators'
import { PublicRoom } from '../models/PublicRoom';

const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})

@Injectable({
  providedIn: 'root'
})
export class QuickRoomService {

  private apiUrl = "http://localhost:3000"

  constructor(
    private http: HttpClient
  ) { }

  createQuickRoom(room: string, nickname: string) {
    const quickRoom = new PublicRoom(room, nickname)
    return this.http.post(this.apiUrl + '/quickRoom', quickRoom.getRoomUser(), {headers: headers}).pipe(this.extractData, catchError(this.handleError))
  }

  private extractData(res: any) {
    let body = res;
    return body || {};
  }

  private handleError(error: any) {
      return observableThrowError(JSON.stringify(error.error.error))
  }

}
