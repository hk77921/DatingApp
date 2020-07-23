import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  togglemode = false;
  value: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
   
  }

  registertoggle() {
    this.togglemode = true;
    console.log(this.togglemode);
  }
  
  cancelRegisterMode(mode: boolean) {
    this.togglemode = mode;
    console.log(mode);
  }
}
