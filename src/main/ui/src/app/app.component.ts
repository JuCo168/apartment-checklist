import { TenantService } from './tenant.service';
import { Component, OnInit } from '@angular/core';
import { Tenant } from './tenant';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public tenants!: Tenant[];
  public tenant!: Tenant | null;

  constructor(private TenantService: TenantService) {}

  ngOnInit() {
    this.getTenants();
  }

  public getTenants(): void {
    this.TenantService.getTenants().subscribe(
      (response: Tenant[]) => {
        this.tenants = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(tenant: Tenant, mode: string): void {
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
    this.TenantService.addTenant(addForm.value).subscribe(
      (response: Tenant) => {
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

  public onUpdateTenant(tenant: Tenant): void {
    this.TenantService.updateTenant(tenant).subscribe(
      (response: Tenant) => {
        console.log(response);
        this.getTenants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public onDeleteTenant(id: number): void {
    this.TenantService.deleteTenant(id).subscribe(
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
    const matches: Tenant[] = [];
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
