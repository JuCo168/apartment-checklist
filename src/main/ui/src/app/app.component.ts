import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { HomeService } from './home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public displayHome!: boolean;

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.displayHome = this.homeService.displayHome;
  }
}
