import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnInit {

  public displayHome;

  constructor() {
    this.displayHome = true;
  }

  ngOnInit(): void {}
}
