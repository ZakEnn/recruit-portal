import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models';
import { Router } from '@angular/router';
import { SwalPartialTargets } from '@sweetalert2/ngx-sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { AdminService } from 'src/app/_services/admin.service';
import { ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({ 
    templateUrl: 'admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
    addingForm: FormGroup;
    submitted: boolean;
    error: string;
    @ViewChild("showSwal") showSwal: SwalComponent;

    constructor( private formBuilder: FormBuilder,
                 private router: Router,
                 public readonly swalTargets: SwalPartialTargets,
                 private adminService: AdminService)
         { }

    ngOnInit() {
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


    addUser(){
        this.submitted = true;

        // stop here if form is invalid
        if (this.addingForm.invalid) {       
             this.showSwal.show();
             return;
        }

        this.adminService.addUser(this.addingForm.value).subscribe(
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