import { TenantsService } from './tenants.service';
import { Component, OnInit } from '@angular/core';
import { Tenants } from './tenants';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public tenants!: Tenants[];

  constructor(private TenantsService: TenantsService) {}

  ngOnInit() {
    this.getTenants();
  }

  public getTenants(): void {
    this.TenantsService.getTenants().subscribe(
      (response: Tenants[]) => {
        this.tenants = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
}
