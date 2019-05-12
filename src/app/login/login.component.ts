import { Component, OnInit } from '@angular/core';    
import { Router } from '@angular/router';    
import { LoginService } from '../login.service';    
import { FormsModule } from '@angular/forms';    
import { RouterModule, Routes } from '@angular/router';


@Component({    
  selector: 'app-login',    
  templateUrl: './login.component.html',    
  styleUrls: ['./login.component.css']    
})    
export class LoginComponent {    
    
  model : any={};    
    
  errorMessage:string;    
  constructor(private router:Router,private LoginService:LoginService) { }    
    
    
  ngOnInit() {    
    sessionStorage.removeItem('username');    
    sessionStorage.clear();    
  }    
  login(){    
    // debugger;    
    this.LoginService.Login(this.model).subscribe(    
      data => {        
        if(data.Status=="Success")    
        {       
          this.router.navigate(['Dasboard'])    
          // debugger;    
        }    
        else{    
          this.errorMessage = data.Message;    
        }    
      },    
      error => {    
        this.errorMessage = error.Message;    
      });    
  };    
 }