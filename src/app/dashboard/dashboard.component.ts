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

  ngOnInit() {
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
        debugger;    
        if(res['status']=="True")    
        {       
            this.isUserExists="visible";
            this.isfailDivVisible="hidden";  
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

    this.fileUploadService.upload(formData).subscribe(
      res =>this.fileUpload = res,
      err =>this.error = err
    );
  }

}
