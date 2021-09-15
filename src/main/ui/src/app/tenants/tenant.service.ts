import { Tenant } from './tenant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { } 

  public getTenants(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(`${this.apiServerUrl}/tenant/all`);
  }

  public getTenantById(id: number): Observable<Tenant> {
    return this.http.get<Tenant>(`${this.apiServerUrl}/tenant/find/${id}`);
  }

  public addTenant(tenant: Tenant): Observable<Tenant> {
    return this.http.post<Tenant>(`${this.apiServerUrl}/tenant/add`, tenant);
  }

  public updateTenant(tenant: Tenant): Observable<Tenant> {
    return this.http.put<Tenant>(`${this.apiServerUrl}/tenant/update`, tenant);
  }

  public deleteTenant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tenant/delete/${id}`);
  }
}
