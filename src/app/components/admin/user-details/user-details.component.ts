import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services';
import { ChangeDetectorRef } from '@angular/core';

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
              private userService: UserService,
              private ref: ChangeDetectorRef) 
              { }

  ngOnInit() {
    this.userService.getByMail(this.mail).subscribe(user => {
        this.user = user;
      });
  }

  getTasks(mail: string){
    this.taskActivated = true;
    console.log("print tasks");
    this.msg="";
    this.userService.getTasksByMail(mail).subscribe(tasks => {
      // this.tasks = tasks.data;
      this.userTasks = tasks;
      if(this.userTasks){
        this.userTasks = this.userTasks.data;
        this.ref.detectChanges();
      }
     });  

    if(!this.userTasks){
      this.msg = "There is no task assigned to this user at this moment !" 
      }
    
  }


}
