import { HomeService } from './../home.service';
import { ApplianceService } from './appliance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Appliance } from './appliance';

@Component({
  selector: 'app-appliances',
  template: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
    <div class="container" id="appliances-page">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" style="color:white;">Appliances</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" 
              aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div class="collapse navbar-collapse" id="navbarColor02">
              <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                      <a class="nav-link" (click)="onOpenModal(null, 'add')">Add Appliance<span class="sr-only">(current)</span></a>
                  </li>
              </ul>
              <form class="form-inline ml-auto">
                  <input type="search" (ngModelChange)="searchAppliance(key.value)" #key="ngModel" ngModel
                      name="key" id="searchKey" class="form-control mr-sm-2" placeholder="Search appliances or buyers..." required>
              </form>
          </div>
      </nav>
        <div class="content contact-list">
            <div class="card card-default">
                <div class="card-body px-3 px-md-5">
                    <div class="row">
                        <div *ngFor="let appliance of appliances" class="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                            <div class="card card-default p-4">
                                <a href="javascript:0" class="media text-secondary" (click)="onOpenModal(appliance, 'edit')" data-toggle="modal" data-target="#modal-appliance">
                                    <img src="{{ appliance?.imageUrl }}" class="mr-3 img-fluid rounded" alt="Avatar Image" />

                                    <div class="media-body">
                                        <h5 class="mt-0 mb-2 text-dark">{{ appliance.name }}</h5>
                                        <ul class="list-unstyled text-smoke">
                                            <li class="d-flex">
                                                <i class="mdi mdi-currency-usd mr-1"></i>
                                                <span>{{ appliance?.price }}</span>
                                            </li>
                                            <li class="d-flex">
                                                <i class="mdi mdi-account mr-1"></i>
                                                <span>{{ appliance?.buyer }}</span>
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
            <div class="modal fade" id="modal-appliance" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <form #editForm="ngForm" (ngSubmit)="onUpdateAppliance(editForm.value)">
                        <div class="modal-header justify-content-end border-bottom-0">
                          <button (click)="onUpdateAppliance(editForm.value)" data-dismiss="modal" class="btn btn-primary" >Save changes</button>
                          <button (click)="onDeleteAppliance(appliance?.id!)" data-dismiss="modal" class="btn btn-danger" >Delete</button>
                          <button class="btn btn-secondary tooltips" data-placement="top" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button>
                        </div>

                        <div class="modal-body pt-0">
                            <div class="row no-gutters">
                                <div class="col-md-6">
                                    <div class="profile-content-left px-4">
                                        <div class="card text-center px-0 border-0">
                                            <div class="card-img mx-auto">
                                              <img class="rounded-circle" src="{{ appliance?.imageUrl }}" alt="user image" />
                                            </div>
                                            <div class="card-body">
                                              <input type="hidden" ngModel="{{ appliance?.id }}" class="form-control" ngModel name="id" id="id" value="{{ appliance?.id }}" />
                                              <input type="text" ngModel="{{ appliance?.name }}" class="form-control" ngModel name="name" id="name" value="{{ appliance?.name }}" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="contact-info px-4">
                                        <h4 class="mb-1">Appliance Details</h4>
                                          <div class="form-group mb-4">
                                            <label for="price">Price</label>
                                            <input type="text" ngModel="{{ appliance?.price }}" class="form-control" ngModel name="price" id="price" value="{{ appliance?.price }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="buyer">Buyer</label>
                                            <input type="text" ngModel="{{ appliance?.buyer }}" class="form-control" ngModel name="buyer" id="buyer" value="{{ appliance?.buyer }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="link">Link</label>
                                            <input type="text" ngModel="{{ appliance?.link }}" class="form-control" ngModel name="link" id="link" value="{{ appliance?.link }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="imageUrl">Image URL</label>
                                            <input type="text" ngModel="{{ appliance?.imageUrl }}"class="form-control" ngModel name="imageUrl" id="imageUrl" value="{{ appliance?.imageUrl }}" />
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
            <div class="modal fade" id="modal-add-appliance" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <form #addForm="ngForm" (ngSubmit)="onAddAppliance(addForm)">
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
                                            <label for="price">Price</label>
                                            <input type="price" class="form-control" ngModel name="price" id="price" placeholder="Price" />
                                        </div>
                                    </div>

                                    <div class="col-lg-12">
                                        <div class="form-group mb-4">
                                            <label for="buyer">Buyer</label>
                                            <input type="text" class="form-control" ngModel name="buyer" id="buyer" placeholder="Buyer" />
                                        </div>
                                    </div>

                                    <div class="col-lg-12">
                                        <div class="form-group mb-4">
                                            <label for="link">Link</label>
                                            <input type="text" class="form-control" ngModel name="link" id="link" placeholder="Link" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="modal-footer px-4">
                                <button type="button" id="add-appliance-close" class="btn btn-smoke btn-pill" data-dismiss="modal">Cancel</button>
                                <button [disabled]="addForm.invalid" type="submit" class="btn btn-primary btn-pill">Save Appliance</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div *ngIf="appliances?.length == 0" class="col-lg-12 col-md-12 col-xl-12">
    <div class="alert alert-info" role="alert">
      <h4 class="alert-heading">No Appliances!</h4>
      <p>No appliances were found.</p>
    </div>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class ApplianceComponent implements OnInit {

  public appliances!: Appliance[];
  public appliance!: Appliance | null;

  constructor(private applianceService: ApplianceService,
    private homeService: HomeService) {}

  ngOnInit() {
    this.getAppliances();
    this.homeService.displayHome = false;
  }

  ngOnDestroy() {
    this.homeService.displayHome = true;
  }

  public getAppliances(): void {
    this.applianceService.getAppliances().subscribe(
      (response: Appliance[]) => {
        this.appliances = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(appliance: Appliance, mode: string): void {
    const container = document.getElementById('appliances-page');
    const button = document.createElement('button');
    this.appliance = appliance;
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch(mode) {
      case 'add': {
        button.setAttribute('data-target', '#modal-add-appliance');
        break;
      }

      case 'edit': {
        button.setAttribute('data-target', '#modal-appliance');
        break;
      }

      case 'delete': {
        button.setAttribute('data-target', '#modal-appliance');
        break;
      }
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddAppliance(addForm: NgForm): void {
    document.getElementById('add-appliance-close')?.click();
    this.applianceService.addAppliance(addForm.value).subscribe(
      (response: Appliance) => {
        console.log(response);
        this.getAppliances();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }
    );
  }

  public onUpdateAppliance(appliance: Appliance): void {
    this.applianceService.updateAppliance(appliance).subscribe(
      (response: Appliance) => {
        console.log(response);
        this.getAppliances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public onDeleteAppliance(id: number): void {
    this.applianceService.deleteAppliance(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAppliances();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public searchAppliance(key: string): void {
    const matches: Appliance[] = [];
    for(const appliance of this.appliances) {
      if(appliance.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      appliance.buyer.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        matches.push(appliance);
      }
    }
    this.appliances = matches;
    if(!key) {
      this.getAppliances();
    }
  }

}
