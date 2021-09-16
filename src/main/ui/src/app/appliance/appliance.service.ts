import { Appliance } from './appliance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { } 

  public getAppliances(): Observable<Appliance[]> {
    return this.http.get<Appliance[]>(`${this.apiServerUrl}/appliance/all`);
  }

  public getApplianceById(id: number): Observable<Appliance> {
    return this.http.get<Appliance>(`${this.apiServerUrl}/appliance/find/${id}`);
  }

  public addAppliance(appliance: Appliance): Observable<Appliance> {
    return this.http.post<Appliance>(`${this.apiServerUrl}/appliance/add`, appliance);
  }

  public updateAppliance(appliance: Appliance): Observable<Appliance> {
    return this.http.put<Appliance>(`${this.apiServerUrl}/appliance/update`, appliance);
  }

  public deleteAppliance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/appliance/delete/${id}`);
  }
}
