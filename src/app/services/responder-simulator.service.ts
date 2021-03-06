import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { MobileServiceConfigurations } from './config.service';

import { Responder } from '../models/responder';
import { MessageService } from './message.service';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class ResponderSimulatorService {
  constructor(private messageService: MessageService, private http: HttpClient, private serverConfig: MobileServiceConfigurations) { }

  async updateStatus(mission: Mission, status: string): Promise<Responder> {
    const url = `${this.serverConfig.getServerUrl()}/responder-simulator/api/responders`;
    const data = {
      responderId: mission.responderId,
      status
    };
    return this.http.post<any>(url, data).pipe(
      catchError(res => this.handleError('updateStatus()', res))
    ).toPromise();
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    console.error(res.error);
    return of(null);
  }
}
