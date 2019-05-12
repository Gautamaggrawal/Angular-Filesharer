import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  searchForm:FormGroup;
  usererror:string;
  error: string;


  fileUpload = {status: '', message: '', filePath: ''};
  constructor(private fb: FormBuilder,private fileUploadService: FileUploadService) { }
  isUserExists:string="hidden";
  isfailDivVisible:string="hidden";
  isLoadingResults = true;
  data: any[] = [];

  ngOnInit() {

      this.fileUploadService.getFileList().subscribe(
        res => {
          console.log("ayayayyyyyyyyyyyyyyy");
          this.data = res['data'];
          console.log(res['data']);
           this.isLoadingResults = true;
          }, err => {
            console.log(err);
            this.isLoadingResults = false;
        });







    this.searchForm=this.fb.group({
      searchusername:[''],
    });

    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });
  }
    onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get('profile').setValue(file);
    }
  }
  onSearch(){
    var datatosend=this.searchForm.get('searchusername').value
    console.log(datatosend);
    this.fileUploadService.SearchUser(datatosend).subscribe(
      res =>{    
        if(res['status']=="True")    
        {       
            this.isUserExists="visible";
            this.isfailDivVisible="hidden";
            localStorage.setItem("sendto",res["touser"]);
            localStorage.setItem("sendby",res['fromuser']);  
        }    

        else{
        this.isfailDivVisible="visible";

        this.usererror=res['message'];    
          console.log(res["message"]);    
        }    
      }
    );
  }



  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.profileForm.get('name').value);
    formData.append('profile', this.profileForm.get('profile').value);
    formData.append('sendto', localStorage.getItem("sendto"));
    formData.append('sendby', localStorage.getItem("sendby"));

    this.fileUploadService.upload(formData).subscribe(
      res =>this.fileUpload = res,
      err =>this.error = err
    );
  }

}