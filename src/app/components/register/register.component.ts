import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services';
import { AlertService } from 'src/app/_services/alert.service';
import { Observable } from 'rxjs/internal/Observable';
import { AdminService } from 'src/app/_services/admin.service';


@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private adminService: AdminService,
        private alertService: AlertService

    ) { 
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmedPassword:['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.adminService.registerUser(this.registerForm.value).subscribe(
          data => {
            this.router.navigate(['/login']);
            return true;
          },
          error =>{
            this.loading = false;
            this.submitted = false;
            this.registerForm.reset();
            this.error = error.error.message + " !";
            console.log(error.error.message);
            return Observable.throw(error);
          }
        );
           
    }
}