import { Component, ElementRef  } from '@angular/core';
import { User } from 'src/app/_models';
import { UserService, AuthenticationService } from 'src/app/_services';
import { FormGroup , FormsModule} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';



@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {

    showDocsStatus:boolean = true;
    showMailsStatus:boolean;
    showNotificationStatus:boolean;
    showValidationStatus:boolean;
    sendingStatus:boolean;
    pdfs : Array<any> = [];
    srcPdfs :  Array<any> = [];
    notifBody;
    emails = [];
    inputValue;
    notifObj;
    fileName:string;
    clicked :boolean;
    dataToSend;
    loading:boolean;
    statusCode:string;

    @ViewChild("showSwal") showSwal: SwalComponent;

    fieldArray: Array<any> = [
        {
          'name': 'Default Name 1'
        },
        {
          'name': 'Default Name 2'
        }
      ];
      newAttribute: any = {};
    
      firstField = true;
      firstFieldName = 'First Item name';
      isEditItems: boolean;
    
      // candidates: any[] = [
      //   {
      //     'name': 'Default Name',
      //     'title': 'Job Title',
      //   },
      //   {
      //     'name': 'Default Name 2',
      //     'title': 'Job Title',
      //   }
      // ];
    
      addFieldValue(index) {
        if (this.fieldArray.length <= 2) {
          this.fieldArray.push(this.newAttribute);
          this.newAttribute = {};
        } else {
    
        }
      }
    
      deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
      }
    
      onEditCloseItems() {
        this.isEditItems = !this.isEditItems;
      }

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private sanitizer: DomSanitizer,
        private location: Location,
        private router: Router
    ) {
       
    }


    ngOnInit() {
        this.showDocsStatus = true;
        this.showMailsStatus = false;
        this.showNotificationStatus = false;
        this.showValidationStatus = false;
        this.location.replaceState("home","step1=uploading-documents");
    }

    onKey(event) {
       this.notifBody = event.target.value;
       console.log(this.notifBody);
       }

    onKeyMail(event) {
       this.inputValue = event.target.value;
       console.log(this.inputValue);
       }

    onKeyObj(event) {
       this.notifObj = event.target.value;
       console.log(this.notifObj);
       }

    onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
          var filesAmount = event.target.files.length;
          this.fileName = event.target.files[0].name;
          for (let i = 0; i < filesAmount; i++) {
                  var reader = new FileReader();

                  reader.onloadend = (event) => {
                    console.log(reader.result);
                    if(reader.result){
                        this.srcPdfs.push(this.base64ToArrayBuffer((reader.result as string).split(',')[1]));
                        this.pdfs.push((reader.result as string).split(',')[1]);
                        }

                  }
                  reader.readAsDataURL(event.target.files[i]);
          }
      }
    }

     

      base64ToArrayBuffer(base64) {
        let binary_string =  window.atob(base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }



    passDocs(){  
        this.showDocsStatus = false;
        this.showMailsStatus = true;
        this.showValidationStatus = false;
        this.showNotificationStatus = false;

        console.log("data to send : "+this.pdfs[0]);
        this.location.replaceState("home","step2=adding-signers");

    }

    passMails(){
        this.showDocsStatus = false;
        this.showValidationStatus = false;
        this.showMailsStatus = false;
        this.showNotificationStatus = true;
        this.emails.push(this.inputValue);
        this.location.replaceState("home","step3=setting-notification");
        console.log("email to send :" + this.emails[0]);
    }

    passNotif(){
        this.showDocsStatus = false;
        this.showValidationStatus = true;
        this.showMailsStatus = false;
        this.showNotificationStatus = false;
        //this.notifBody = this.inputValue;
        console.log("email to send :" + this.emails[0]);
        console.log("notif to send :" + this.notifBody);
        this.dataToSend = {
            "usageId":"b72751fd-5ca4-11e9-8fe5-0242ac110006",
            "taskName": "sign01",
            "pdfB64":this.pdfs[0],
            "mail":this.emails[0],
            "notifSubject": this.notifObj,
            "notifBody": this.notifBody
        }
        this.location.replaceState("home","step4=confirm-informations");

        console.log(this.dataToSend);
    }

    sendObj(){
        this.loading = true;
        this.userService.sendData(this.dataToSend)
        .subscribe(
         data => {
            if(data){
              this.sendingStatus = true;
              console.log(JSON.stringify(data));
            }else{
              this.sendingStatus = false;
              console.log(JSON.stringify(data));
            }
            console.log("here is backend data : "+data);
            setTimeout(() => {
              this.showSwal.show();
            }, 1000); 
            this.loading = false;
            
          },
          error => {
            this.sendingStatus = false;
            console.log(error.error.message.split(' ')[1]);
            this.statusCode = error.error.message;
            setTimeout(() => {
              this.showSwal.show();
            }, 1000);     
            this.loading = false;
          }
        );
        
    }


    swalProcess(showSwal: SwalComponent){
      console.log(showSwal.type);
      if(showSwal.type == 'success'){
        this.router.navigate(['/home']);
        console.log("wala simo bien joué");
      }else{
        console.log("waiting");
      }
    }

    reset(){
      this.router.navigate(['/home']);
    }

  }
