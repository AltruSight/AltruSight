import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  registerError = false;

  constructor() { }

  ngOnInit(): void {
  }

  register(userEmail: string, userPassword: string, userConfirmPassword: string):void {
    console.log(userEmail);
    console.log(userPassword);
    console.log(userConfirmPassword);
    this.registerError = true;
  }


}

