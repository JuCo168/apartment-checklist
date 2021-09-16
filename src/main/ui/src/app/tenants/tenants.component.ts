import { TenantService } from './tenant.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tenant } from './tenant';

@Component({
  selector: 'app-tenants',
  template: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
    <div class="container" id="tenants-page">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" style="color:white;">Tenants</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" 
              aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div class="collapse navbar-collapse" id="navbarColor02">
              <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                      <a class="nav-link" (click)="onOpenModal(null, 'add')">Add Tenant<span class="sr-only">(current)</span></a>
                  </li>
              </ul>
              <form class="form-inline ml-auto">
                  <input type="search" (ngModelChange)="searchTenant(name.value)" #name="ngModel" ngModel
                      name="key" id="searchName" class="form-control mr-sm-2" placeholder="Search tenants..." required>
              </form>
          </div>
      </nav>
        <div class="content contact-list">
            <div class="card card-default">
                <div class="card-body px-3 px-md-5">
                    <div class="row">
                        <div *ngFor="let tenant of tenants" class="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                            <div class="card card-default p-4">
                                <a href="javascript:0" class="media text-secondary" (click)="onOpenModal(tenant, 'edit')" data-toggle="modal" data-target="#modal-tenant">
                                    <img src="{{ tenant?.imageUrl }}" class="mr-3 img-fluid rounded" alt="Avatar Image" />

                                    <div class="media-body">
                                        <h5 class="mt-0 mb-2 text-dark">{{ tenant.name }}</h5>
                                        <ul class="list-unstyled text-smoke">
                                            <li class="d-flex">
                                                <i class="mdi mdi-email mr-1"></i>
                                                <span>{{ tenant?.email }}</span>
                                            </li>
                                            <li class="d-flex">
                                                <i class="mdi mdi-phone mr-1"></i>
                                                <span>{{ tenant?.phone }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Modal -->
            <div class="modal fade" id="modal-tenant" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <form #editForm="ngForm" (ngSubmit)="onUpdateTenant(editForm.value)">
                        <div class="modal-header justify-content-end border-bottom-0">
                          <button (click)="onUpdateTenant(editForm.value)" data-dismiss="modal" class="btn btn-primary" >Save changes</button>
                          <button (click)="onDeleteTenant(tenant?.id!)" data-dismiss="modal" class="btn btn-danger" >Delete</button>
                          <button class="btn btn-secondary tooltips" data-placement="top" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button>
                        </div>

                        <div class="modal-body pt-0">
                            <div class="row no-gutters">
                                <div class="col-md-6">
                                    <div class="profile-content-left px-4">
                                        <div class="card text-center px-0 border-0">
                                            <div class="card-img mx-auto">
                                              <img class="rounded-circle" src="{{ tenant?.imageUrl }}" alt="user image" />
                                            </div>
                                            <div class="card-body">
                                              <input type="hidden" ngModel="{{ tenant?.id }}" class="form-control" ngModel name="id" id="id" value="{{ tenant?.id }}" />
                                              <input type="text" ngModel="{{ tenant?.name }}" class="form-control" ngModel name="name" id="name" value="{{ tenant?.name }}" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="contact-info px-4">
                                        <h4 class="mb-1">Contact Details</h4>
                                          <div class="form-group mb-4">
                                            <label for="email">Email</label>
                                            <input type="email" ngModel="{{ tenant?.email }}" class="form-control" ngModel name="email" id="email" value="{{ tenant?.email }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="phone">Phone</label>
                                            <input type="text" ngModel="{{ tenant?.phone }}" class="form-control" ngModel name="phone" id="phone" value="{{ tenant?.phone }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="imageUrl">Image URL</label>
                                            <input type="text" ngModel="{{ tenant?.imageUrl }}"class="form-control" ngModel name="imageUrl" id="imageUrl" value="{{ tenant?.imageUrl }}" />
                                          </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </form>
                    </div>
                </div>
            </div>

            <!-- Add Contact Button  -->
            <div class="modal fade" id="modal-add-tenant" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <form #addForm="ngForm" (ngSubmit)="onAddTenant(addForm)">
                            <div class="modal-header px-4">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Create New Contact</h5>
                            </div>
                            <div class="modal-body px-4">
                                <div class="form-group row mb-6">
                                    <label for="imageUrl" class="col-sm-4 col-lg-2 col-form-label">User Image</label>
                                    <div class="col-sm-8 col-lg-10">
                                      <div class="form-group">
                                        <input type="text" class="form-control" ngModel name="imageUrl" id="imageUrl" placeholder="Image URL" required/>
                                      </div>  
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" class="form-control" ngModel name="name" id="name" placeholder="Name" required/>
                                        </div>
                                    </div>

                                    <div class="col-lg-12">
                                        <div class="form-group mb-4">
                                            <label for="email">Email</label>
                                            <input type="email" class="form-control" ngModel name="email" id="email" placeholder="Email" />
                                        </div>
                                    </div>

                                    <div class="col-lg-12">
                                        <div class="form-group mb-4">
                                            <label for="phone">Phone</label>
                                            <input type="text" class="form-control" ngModel name="phone" id="phone" placeholder="Phone" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer px-4">
                                <button type="button" id="add-tenant-close" class="btn btn-smoke btn-pill" data-dismiss="modal">Cancel</button>
                                <button [disabled]="addForm.invalid" type="submit" class="btn btn-primary btn-pill">Save Tenant</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class TenantComponent implements OnInit {

  public tenants!: Tenant[];
  public tenant!: Tenant | null;

  constructor(private tenantService: TenantService) {}

  ngOnInit() {
    this.getTenants();
  }

  public getTenants(): void {
    this.tenantService.getTenants().subscribe(
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
    this.tenantService.addTenant(addForm.value).subscribe(
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
    this.tenantService.updateTenant(tenant).subscribe(
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
    this.tenantService.deleteTenant(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTenants();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public searchTenant(key: string): void {
    const matches: Tenant[] = [];
    for(const tenant of this.tenants) {
      if(tenant.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        matches.push(tenant);
      }
    }
    this.tenants = matches;
    if(!key) {
      this.getTenants();
    }
  }

}
