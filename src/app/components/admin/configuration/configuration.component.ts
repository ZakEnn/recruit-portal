import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { SwalPartialTargets } from '@sweetalert2/ngx-sweetalert2';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs/internal/Observable';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  configuration: any = {};
  discoveryConfig: any;
  location: string;
  hasConfig: boolean;
  configList: any = [];
  discoveryConfigList: any = [];
  notificationConfigList: any = [];
  editField: string;
  actualConfig: string;

  addingForm: FormGroup;
  submitted: boolean;
  error: string;

  services:any = [
    {
      "id":"uaa-service",
      "name":"User Account And Authentication",
      "description": "Service that authenticate and register users"
    },
    {
      "id":"discovery-service",
      "name":"DNS configuration",
      "description": "Service that register services name"
    },
    {
      "id":"notification-service",
      "name":"Notification Sender",
      "description": "Service that send and emails"
    }
  ] 

  @ViewChild("showSwal") showSwal: SwalComponent;


  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder,
              public readonly swalTargets: SwalPartialTargets
  ) {
   }


  ngOnInit() {
    this.services.forEach(service => {
      console.log("service name : " + service.id);
      this.adminService.getConfiguration(service.id, "dev").subscribe(configuration => {
        this.configuration[service.id] = configuration;
        console.log(service.id+" configuration : " + this.configuration[service.id]);
      });
    });

    this.addingForm = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });

  }

  back(){
    this.hasConfig = false;
    this.discoveryConfigList = [];
    this.notificationConfigList = [];
    this.configList = [];
    this.actualConfig = "";
  }

  chooseConf(){
    switch (this.actualConfig) {
      case 'uaa-service':
        console.log('uaa service wee.');
        return this.configList;
      case 'discovery-service':
        console.log('discovery service wee.');
        return this.discoveryConfigList;
      case 'notification-service':
      console.log('notification service wee.');
      return this.notificationConfigList;
      default:
        console.log('Sorry, u dont nothing jon snow ');
    }
   
  }

  getConfig(serviceName:string){
    console.log("look to service name :"+ serviceName)

    this.actualConfig = serviceName;
    this.hasConfig = true;
    //this.location =  this.configuration[serviceName].propertySources[0].name;
    let serviceConf = this.configuration[serviceName];
    serviceConf.forEach(conf => {
      this.configList.push([conf.key, conf.value]);     
    });

  }

  

  update(key: string) {
    this.adminService.updateConfig(this.actualConfig, key, this.editField).subscribe(
      data => {
        console.log("data to update: "+data);
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

    this.adminService.refreshConfig().subscribe(
      data => {
        console.log("data to refresh: "+data);
        return true;
      },
      error => {
       // this.submitted = false;
        this.addingForm.reset();
        this.error = error.error.message + " !";
        console.log(error.error.message);
        return Observable.throw(error);
      }
    );

  }

  changeValue(id: any, event: any) {
    this.editField = event.target.textContent;
    console.log("value : "+event.target.value);
    console.log("edit field : "+this.editField);
  }

  delete(key : string){
    console.log("deleting : "+ key + " in :" + this.actualConfig );
    this.adminService.deleteConfig(this.actualConfig, key).subscribe(
      data => {
        console.log("data to delete : "+data);
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

    this.adminService.refreshConfig().subscribe(
      data => {
        console.log("data to refresh: "+data);
        return true;
      },
      error => {
       // this.submitted = false;
        this.addingForm.reset();
        this.error = error.error.message + " !";
        console.log(error.error.message);
        return Observable.throw(error);
      }
    );

  }

  get f() { return this.addingForm.controls; }


  addConfig(){
      this.submitted = true;

      // stop here if form is invalid
      if (this.addingForm.invalid) {       
           this.showSwal.show();
           return;
      }

      this.adminService.addConfig(this.addingForm.value,this.actualConfig).subscribe(
        data => {
          console.log("data : "+data);
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

      this.adminService.refreshConfig().subscribe(
        data => {
          console.log("data to refresh: "+data);
          return true;
        },
        error => {
         // this.submitted = false;
          this.addingForm.reset();
          this.error = error.error.message + " !";
          console.log(error.error.message);
          return Observable.throw(error);
        }
      );
         
  }

}
