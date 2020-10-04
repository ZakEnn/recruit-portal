import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalPartialTargets, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { AdminService } from 'src/app/_services/admin.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  users :any = [];
  addingForm: FormGroup;
  submitted: boolean;
  error: string;
  @ViewChild("showSwal") showUpdateSwal: SwalComponent;

  constructor( private formBuilder: FormBuilder,
               private router: Router,
               public readonly swalTargets: SwalPartialTargets,
               private adminService: AdminService) { 
    }

    ngOnInit() {
       
        this.adminService.getAllUsers().subscribe(users => {
            this.users = users;
        });

        this.addingForm = this.formBuilder.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', Validators.required],
          phone: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmedPassword:['', [Validators.required, Validators.minLength(6)]]
      });
     

  }

  get f() { return this.addingForm.controls; }

  delete(mail:string){
        this.adminService.removeUser(mail).subscribe(user => {
          console.log(user);
        });
    }

  userDetails(mail:string){
      this.router.navigateByUrl('/admin/user-details/'+btoa(mail));
    }

  updateUser(mail: string){
      console.log("updating now");

        this.submitted = true;

        // stop here if form is invalid
        if (this.addingForm.invalid) {       
             this.showUpdateSwal.show();
             return;
        }

        this.adminService.updateUser(mail, this.addingForm.value).subscribe(
          data => {
            return true;
          },
          error => {
            this.submitted = false;
            this.addingForm.reset();
            this.error = error.error.message + " !";
            console.log(error.error.message);
            return Observable.throw(error);
          }
        );
      }

}
