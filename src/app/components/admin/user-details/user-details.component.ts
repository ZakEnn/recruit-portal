import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  mail: string = atob(this.route.snapshot.firstChild.url[0].path) ;
  user :any;
  taskActivated: boolean;
  userTasks: any;
  msg: string ="";

  constructor(private router:Router,
              private route:ActivatedRoute,
              private adminService: AdminService,
              private ref: ChangeDetectorRef) 
              { }

  ngOnInit() {
    this.adminService.getUserByMail(this.mail).subscribe(user => {
        this.user = user;
      });
  }


}
