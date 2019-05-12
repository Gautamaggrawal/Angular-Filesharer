import { Component, OnInit } from '@angular/core';    
import { LoginService } from '../login.service';    
import {Register} from '../register';    
import {Observable} from 'rxjs';    
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';    
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';



@Component({    
  selector: 'app-register',    
  templateUrl: './register.component.html',    
  styleUrls: ['./register.component.css']    
})    
export class RegisterComponent implements OnInit {
  employeeForm: FormGroup;
  // UserName:FormControl;
  // LoginName: FormControl;
  // Password: FormControl;
  // confirmPassword:FormControl;
  data = false;    
  UserForm: any;    
  message:string;    
  constructor(private formbulider: FormBuilder,private loginService:LoginService,private router:Router) { }    
  issuccessDivVisible: string = "hidden";
  isfailDivVisible: string = "hidden";
  
  ngOnInit() {
    this.employeeForm = this.formbulider.group({    
      username: ['', [Validators.required]],    
      first_name: ['', [Validators.required]],    
      password: ['', [Validators.required,Validators.minLength(8)]],
      confirmPassword:['', [Validators.required,Validators.minLength(8)]],    
    });    
  }    
   onSubmit()    
  {    
    const user = this.employeeForm.value;    
    this.Createemployee(user);    
  }
    Createemployee(register:Register)    
  {    
  this.loginService.CreateUser(register).subscribe(    
    response=>    
    {
      console.log(response);

      // this.data = true;
    if(response['Status']=="Success"){
      console.log("Form Submitted!");
      this.isfailDivVisible= "hidden";
      this.issuccessDivVisible= "visible";
      this.employeeForm.reset();      
      this.message = response['Message'];
    }     
    },
    error=> {
    console.log(error['error']['username'][0])     
    this.isfailDivVisible= "visible";
    console.log(this.isfailDivVisible)
      this.message = error['error']['username'][0];}
    );    
  }    
}        