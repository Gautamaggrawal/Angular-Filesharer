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
    // localStorage.removeItem('refresh');
    // localStorage.removeItem('access');        
    // localStorage.clear();    
  }

  createaccount(){
    this.router.navigate(['AddUser'])
  }    
  login(){    
    debugger;    
    this.LoginService.Login(this.model).subscribe(    
      data => {

        console.log(data)
                
        if(data.access && data.refresh)    
        {
          localStorage.setItem('refresh', data.refresh);
          localStorage.setItem('access', data.access);       
          this.router.navigate(['Dasboard'])        
        }    
        else{    
          this.errorMessage = data.Message;    
        }    
      },    
      error => {    
        this.errorMessage = "Invalid credentials";    
      });    
  };    
 }
