import { Utility } from './utility';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { } 

  public getUtilitys(): Observable<Utility[]> {
    return this.http.get<Utility[]>(`${this.apiServerUrl}/utility/all`);
  }

  public getUtilityById(id: number): Observable<Utility> {
    return this.http.get<Utility>(`${this.apiServerUrl}/utility/find/${id}`);
  }

  public addUtility(utility: Utility): Observable<Utility> {
    return this.http.post<Utility>(`${this.apiServerUrl}/utility/add`, utility);
  }

  public updateUtility(utility: Utility): Observable<Utility> {
    return this.http.put<Utility>(`${this.apiServerUrl}/utility/update`, utility);
  }

  public deleteUtility(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/utility/delete/${id}`);
  }
}
