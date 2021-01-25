import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  submitted: Boolean;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.passwordForm.controls; }

  onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.passwordForm.invalid) {
            return;
        }

        this.adminService.changePassword(this.f.email.value, this.f.newPassword.value).subscribe(
          data => {
            this.router.navigate(['/login']);
            return true;
          },
          error =>{
            this.submitted = false;
            this.passwordForm.reset();
            this.error = error.error.message + " !";
            console.log(error.error.message);
            return Observable.throw(error);
          }
        );
           
    }

}
