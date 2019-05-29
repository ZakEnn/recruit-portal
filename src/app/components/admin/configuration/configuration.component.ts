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
  editField: string;
  actualConfig: string;

  addingForm: FormGroup;
  submitted: boolean;
  error: string;

  @ViewChild("showSwal") showSwal: SwalComponent;


  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder,
              public readonly swalTargets: SwalPartialTargets
  ) {
   }


  ngOnInit() {
    let servicesName = ["uaa-service","discovery-service"];
    for(let serviceName in servicesName){
      console.log("service name : " + servicesName[serviceName]);
      //  this.adminService.getConfig(servicesName[serviceName]).subscribe(configuration => {
      //     this.configuration[servicesName[serviceName]] = configuration;
      //     console.log(serviceName+" configuration : " + this.configuration[servicesName[serviceName]]);
      //   });
        this.adminService.getConfiguration(servicesName[serviceName]).subscribe(configuration => {
          this.configuration[servicesName[serviceName]] = configuration;
          console.log(serviceName+" configuration 2 : " + this.configuration[servicesName[serviceName]]);
        });
      }

   
    this.addingForm = this.formBuilder.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  back(){
    this.hasConfig = false;
    this.discoveryConfigList = [];
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
      default:
        console.log('Sorry, u dont nothing jon snow ');
    }
   
  }

  getConfig(serviceName:string){
    console.log("look to service name :"+ serviceName)

    this.actualConfig = serviceName;
    this.hasConfig = true;
    //this.location =  this.configuration[serviceName].propertySources[0].name;
    let jsonData = this.configuration[serviceName];
    for(var i in jsonData){
         this.configList.push([i, jsonData[i]]);     
      }
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
