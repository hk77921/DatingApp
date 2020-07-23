import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  value: any;
  constructor(private authservice: AuthService) {}

  ngOnInit() {}
  register() {
    this.authservice.register(this.model).subscribe(
      () => {console.log("Registration done ");},
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled!!');
  }
}
