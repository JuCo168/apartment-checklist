import { Tenants } from './tenants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  private apiServerUrl = environment.apiBaseUrl ;

  constructor(private http: HttpClient) { } 

  public getTenants(): Observable<Tenants[]> {
    return this.http.get<Tenants[]>(`${this.apiServerUrl}/tenants/all`);
  }

  public getTenantByName(name: string): Observable<Tenants> {
    return this.http.get<Tenants>(`${this.apiServerUrl}/tenants/find/${name}`);
  }

  public addTenant(tenant: Tenants): Observable<Tenants> {
    return this.http.post<Tenants>(`${this.apiServerUrl}/tenants/add`, tenant);
  }

  public updateTenant(tenant: Tenants): Observable<Tenants> {
    return this.http.put<Tenants>(`${this.apiServerUrl}/tenants/update`, tenant);
  }

  public deleteTenant(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tenants/delete/${name}`);
  }
}
