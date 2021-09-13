import { TenantsService } from './tenants.service';
import { Component, OnInit } from '@angular/core';
import { Tenants } from './tenants';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public tenants!: Tenants[];
  public tenant!: Tenants | null;

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

  public onOpenModal(tenant: Tenants, mode: string): void {
    const container = document.getElementById('tenants-page');
    const button = document.createElement('button');
    this.tenant = tenant;
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch(mode) {
      case 'add': {
        button.setAttribute('data-target', '#modal-add-tenant');
        break;
      }

      case 'edit': {
        button.setAttribute('data-target', '#modal-tenant');
        break;
      }

      case 'delete': {
        button.setAttribute('data-target', '#modal-tenant');
        break;
      }
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddTenant(addForm: NgForm): void {
    document.getElementById('add-tenant-close')?.click();
    this.TenantsService.addTenant(addForm.value).subscribe(
      (response: Tenants) => {
        console.log(response);
        this.getTenants();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }
    );
  }

  public onUpdateTenant(tenant: Tenants): void {
    this.TenantsService.updateTenant(tenant).subscribe(
      (response: Tenants) => {
        console.log(response);
        this.getTenants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public onDeleteTenant(name: string): void {
    this.TenantsService.deleteTenant(name).subscribe(
      (response: void) => {
        console.log(response);
        this.getTenants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public searchTenant(name: string): void {
    const matches: Tenants[] = [];
    for(const tenant of this.tenants) {
      if(tenant.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
        matches.push(tenant);
      }
    }
    this.tenants = matches;
    if(matches.length === 0 || !name) {
      this.getTenants();
    }
  }
}
