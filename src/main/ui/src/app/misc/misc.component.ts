import { MiscService } from './misc.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Misc } from './misc';

@Component({
  selector: 'app-misc',
  template: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
    <div class="container" id="misc-page">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" style="color:white;">Misc</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" 
              aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div class="collapse navbar-collapse" id="navbarColor02">
              <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                      <a class="nav-link" (click)="onOpenModal(null, 'add')">Add Misc<span class="sr-only">(current)</span></a>
                  </li>
              </ul>
              <form class="form-inline ml-auto">
                  <input type="search" (ngModelChange)="searchMisc(key.value)" #key="ngModel" ngModel
                      name="key" id="searchKey" class="form-control mr-sm-2" placeholder="Search misc or buyers..." required>
              </form>
          </div>
      </nav>
        <div class="content contact-list">
            <div class="card card-default">
                <div class="card-body px-3 px-md-5">
                    <div class="row">
                        <div *ngFor="let misc of miscList" class="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                            <div class="card card-default p-4">
                                <a href="javascript:0" class="media text-secondary" (click)="onOpenModal(misc, 'edit')" data-toggle="modal" data-target="#modal-misc">
                                    <img src="{{ misc?.imageUrl }}" class="mr-3 img-fluid rounded" alt="Avatar Image" />

                                    <div class="media-body">
                                        <h5 class="mt-0 mb-2 text-dark">{{ misc.name }}</h5>
                                        <ul class="list-unstyled text-smoke">
                                            <li class="d-flex">
                                                <i class="mdi mdi-currency-usd mr-1"></i>
                                                <span>{{ misc?.price }}</span>
                                            </li>
                                            <li class="d-flex">
                                                <i class="mdi mdi-account mr-1"></i>
                                                <span>{{ misc?.buyer }}</span>
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
            <div class="modal fade" id="modal-misc" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <form #editForm="ngForm" (ngSubmit)="onUpdateMisc(editForm.value)">
                        <div class="modal-header justify-content-end border-bottom-0">
                          <button (click)="onUpdateMisc(editForm.value)" data-dismiss="modal" class="btn btn-primary" >Save changes</button>
                          <button (click)="onDeleteMisc(misc?.id!)" data-dismiss="modal" class="btn btn-danger" >Delete</button>
                          <button class="btn btn-secondary tooltips" data-placement="top" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button>
                        </div>

                        <div class="modal-body pt-0">
                            <div class="row no-gutters">
                                <div class="col-md-6">
                                    <div class="profile-content-left px-4">
                                        <div class="card text-center px-0 border-0">
                                            <div class="card-img mx-auto">
                                              <img class="rounded-circle" src="{{ misc?.imageUrl }}" alt="user image" />
                                            </div>
                                            <div class="card-body">
                                              <input type="hidden" ngModel="{{ misc?.id }}" class="form-control" ngModel name="id" id="id" value="{{ misc?.id }}" />
                                              <input type="text" ngModel="{{ misc?.name }}" class="form-control" ngModel name="name" id="name" value="{{ misc?.name }}" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="contact-info px-4">
                                        <h4 class="mb-1">Misc Details</h4>
                                          <div class="form-group mb-4">
                                            <label for="price">Price</label>
                                            <input type="text" ngModel="{{ misc?.price }}" class="form-control" ngModel name="price" id="price" value="{{ misc?.price }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="buyer">Buyer</label>
                                            <input type="text" ngModel="{{ misc?.buyer }}" class="form-control" ngModel name="buyer" id="buyer" value="{{ misc?.buyer }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="link">Link</label>
                                            <input type="text" ngModel="{{ misc?.link }}" class="form-control" ngModel name="link" id="link" value="{{ misc?.link }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="imageUrl">Image URL</label>
                                            <input type="text" ngModel="{{ misc?.imageUrl }}"class="form-control" ngModel name="imageUrl" id="imageUrl" value="{{ misc?.imageUrl }}" />
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
            <div class="modal fade" id="modal-add-misc" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <form #addForm="ngForm" (ngSubmit)="onAddMisc(addForm)">
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
                                <button type="button" id="add-misc-close" class="btn btn-smoke btn-pill" data-dismiss="modal">Cancel</button>
                                <button [disabled]="addForm.invalid" type="submit" class="btn btn-primary btn-pill">Save Misc</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notification for no misc items -->
    <div *ngIf="miscList?.length == 0" class="col-lg-12 col-md-12 col-xl-12">
    <div class="alert alert-info" role="alert">
      <h4 class="alert-heading">No Misc Items!</h4>
      <p>No misc items were found.</p>
    </div>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class MiscComponent implements OnInit {

  public miscList!: Misc[];
  public misc!: Misc | null;

  constructor(private miscService: MiscService) {}

  ngOnInit() {
    this.getMisc();
  }

  public getMisc(): void {
    this.miscService.getMisc().subscribe(
      (response: Misc[]) => {
        this.miscList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(misc: Misc, mode: string): void {
    const container = document.getElementById('misc-page');
    const button = document.createElement('button');
    this.misc = misc;
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch(mode) {
      case 'add': {
        button.setAttribute('data-target', '#modal-add-misc');
        break;
      }

      case 'edit': {
        button.setAttribute('data-target', '#modal-misc');
        break;
      }

      case 'delete': {
        button.setAttribute('data-target', '#modal-misc');
        break;
      }
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddMisc(addForm: NgForm): void {
    document.getElementById('add-misc-close')?.click();
    this.miscService.addMisc(addForm.value).subscribe(
      (response: Misc) => {
        console.log(response);
        this.getMisc();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }
    );
  }

  public onUpdateMisc(misc: Misc): void {
    this.miscService.updateMisc(misc).subscribe(
      (response: Misc) => {
        console.log(response);
        this.getMisc();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public onDeleteMisc(id: number): void {
    this.miscService.deleteMisc(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getMisc();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public searchMisc(key: string): void {
    const matches: Misc[] = [];
    for(const misc of this.miscList) {
      if(misc.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      misc.buyer.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        matches.push(misc);
      }
    }
    this.miscList = matches;
    if(!key) {
      this.getMisc();
    }
  }

}
