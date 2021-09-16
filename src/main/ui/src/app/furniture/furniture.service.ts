import { Furniture } from './furniture';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { } 

  public getFurniture(): Observable<Furniture[]> {
    return this.http.get<Furniture[]>(`${this.apiServerUrl}/furniture/all`);
  }

  public getFurnitureById(id: number): Observable<Furniture> {
    return this.http.get<Furniture>(`${this.apiServerUrl}/furniture/find/${id}`);
  }

  public addFurniture(furniture: Furniture): Observable<Furniture> {
    return this.http.post<Furniture>(`${this.apiServerUrl}/furniture/add`, furniture);
  }

  public updateFurniture(furniture: Furniture): Observable<Furniture> {
    return this.http.put<Furniture>(`${this.apiServerUrl}/furniture/update`, furniture);
  }

  public deleteFurniture(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/furniture/delete/${id}`);
  }
}
