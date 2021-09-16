import { UtilityService } from './utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Utility } from './utility';

@Component({
  selector: 'app-utilities',
  template: `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossorigin="anonymous" />
    <div class="container" id="utilities-page">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" style="color:white;">Utilities</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" 
              aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation"></button>
          <div class="collapse navbar-collapse" id="navbarColor02">
              <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                      <a class="nav-link" (click)="onOpenModal(null, 'add')">Add Utility<span class="sr-only">(current)</span></a>
                  </li>
              </ul>
              <form class="form-inline ml-auto">
                  <input type="search" (ngModelChange)="searchUtility(key.value)" #key="ngModel" ngModel
                      name="key" id="searchKey" class="form-control mr-sm-2" placeholder="Search utilities or buyers..." required>
              </form>
          </div>
      </nav>
        <div class="content contact-list">
            <div class="card card-default">
                <div class="card-body px-3 px-md-5">
                    <div class="row">
                        <div *ngFor="let utility of utilities" class="col-lg-6 col-xl-4 col-md-6 col-sm-12">
                            <div class="card card-default p-4">
                                <a href="javascript:0" class="media text-secondary" (click)="onOpenModal(utility, 'edit')" data-toggle="modal" data-target="#modal-utility">
                                    <img src="{{ utility?.imageUrl }}" class="mr-3 img-fluid rounded" alt="Avatar Image" />

                                    <div class="media-body">
                                        <h5 class="mt-0 mb-2 text-dark">{{ utility.name }}</h5>
                                        <ul class="list-unstyled text-smoke">
                                            <li class="d-flex">
                                                <i class="mdi mdi-currency-usd mr-1"></i>
                                                <span>{{ utility?.price }}</span>
                                            </li>
                                            <li class="d-flex">
                                                <i class="mdi mdi-account mr-1"></i>
                                                <span>{{ utility?.buyer }}</span>
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
            <div class="modal fade" id="modal-utility" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                      <form #editForm="ngForm" (ngSubmit)="onUpdateUtility(editForm.value)">
                        <div class="modal-header justify-content-end border-bottom-0">
                          <button (click)="onUpdateUtility(editForm.value)" data-dismiss="modal" class="btn btn-primary" >Save changes</button>
                          <button (click)="onDeleteUtility(utility?.id!)" data-dismiss="modal" class="btn btn-danger" >Delete</button>
                          <button class="btn btn-secondary tooltips" data-placement="top" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i></button>
                        </div>

                        <div class="modal-body pt-0">
                            <div class="row no-gutters">
                                <div class="col-md-6">
                                    <div class="profile-content-left px-4">
                                        <div class="card text-center px-0 border-0">
                                            <div class="card-img mx-auto">
                                              <img class="rounded-circle" src="{{ utility?.imageUrl }}" alt="user image" />
                                            </div>
                                            <div class="card-body">
                                              <input type="hidden" ngModel="{{ utility?.id }}" class="form-control" ngModel name="id" id="id" value="{{ utility?.id }}" />
                                              <input type="text" ngModel="{{ utility?.name }}" class="form-control" ngModel name="name" id="name" value="{{ utility?.name }}" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="contact-info px-4">
                                        <h4 class="mb-1">Utility Details</h4>
                                          <div class="form-group mb-4">
                                            <label for="price">Price</label>
                                            <input type="text" ngModel="{{ utility?.price }}" class="form-control" ngModel name="price" id="price" value="{{ utility?.price }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="buyer">Buyer</label>
                                            <input type="text" ngModel="{{ utility?.buyer }}" class="form-control" ngModel name="buyer" id="buyer" value="{{ utility?.buyer }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="link">Link</label>
                                            <input type="text" ngModel="{{ utility?.link }}" class="form-control" ngModel name="link" id="link" value="{{ utility?.link }}" />
                                          </div>
                                          <div class="form-group mb-4">
                                            <label for="imageUrl">Image URL</label>
                                            <input type="text" ngModel="{{ utility?.imageUrl }}"class="form-control" ngModel name="imageUrl" id="imageUrl" value="{{ utility?.imageUrl }}" />
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
            <div class="modal fade" id="modal-add-utility" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <form #addForm="ngForm" (ngSubmit)="onAddUtility(addForm)">
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
                                <button type="button" id="add-utility-close" class="btn btn-smoke btn-pill" data-dismiss="modal">Cancel</button>
                                <button [disabled]="addForm.invalid" type="submit" class="btn btn-primary btn-pill">Save Utility</button>
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
export class UtilityComponent implements OnInit {

  public utilities!: Utility[];
  public utility!: Utility | null;

  constructor(private utilityService: UtilityService) {}

  ngOnInit() {
    this.getUtilities();
  }

  public getUtilities(): void {
    this.utilityService.getUtilities().subscribe(
      (response: Utility[]) => {
        this.utilities = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(utility: Utility, mode: string): void {
    const container = document.getElementById('utilities-page');
    const button = document.createElement('button');
    this.utility = utility;
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch(mode) {
      case 'add': {
        button.setAttribute('data-target', '#modal-add-utility');
        break;
      }

      case 'edit': {
        button.setAttribute('data-target', '#modal-utility');
        break;
      }

      case 'delete': {
        button.setAttribute('data-target', '#modal-utility');
        break;
      }
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddUtility(addForm: NgForm): void {
    document.getElementById('add-utility-close')?.click();
    this.utilityService.addUtility(addForm.value).subscribe(
      (response: Utility) => {
        console.log(response);
        this.getUtilities();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }
    );
  }

  public onUpdateUtility(utility: Utility): void {
    this.utilityService.updateUtility(utility).subscribe(
      (response: Utility) => {
        console.log(response);
        this.getUtilities();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public onDeleteUtility(id: number): void {
    this.utilityService.deleteUtility(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getUtilities();
      },
      (error: HttpErrorResponse) => {
        alert(error.message )
      }
    );
  }

  public searchUtility(key: string): void {
    const matches: Utility[] = [];
    for(const utility of this.utilities) {
      if(utility.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      utility.buyer.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        matches.push(utility);
      }
    }
    this.utilities = matches;
    if(!key) {
      this.getUtilities();
    }
  }

}
