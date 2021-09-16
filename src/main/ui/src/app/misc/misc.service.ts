import { Misc } from './misc';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { } 

  public getMisc(): Observable<Misc[]> {
    return this.http.get<Misc[]>(`${this.apiServerUrl}/misc/all`);
  }

  public getMiscById(id: number): Observable<Misc> {
    return this.http.get<Misc>(`${this.apiServerUrl}/misc/find/${id}`);
  }

  public addMisc(misc: Misc): Observable<Misc> {
    return this.http.post<Misc>(`${this.apiServerUrl}/misc/add`, misc);
  }

  public updateMisc(misc: Misc): Observable<Misc> {
    return this.http.put<Misc>(`${this.apiServerUrl}/misc/update`, misc);
  }

  public deleteMisc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/misc/delete/${id}`);
  }
}
