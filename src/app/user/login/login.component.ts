import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hide = true;
  loginError = false;

  testEmail = ["rtoche@uark.edu"]
  testPassword = ["legomyego"]

  constructor() { }

  ngOnInit(): void {
  }

  login(userEmail: string, userPassword: string):void {
    console.log(userEmail);
    console.log(userPassword);
    this.loginError = true;
  }


}
