import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  tasks :any = [];
  pdfB64:any;
  isTaskActive:boolean;
  userTask:any;

  dataToSend = {
    "taskName": "",
    "validateConditions":false
  };

  processId;
  closeResult:string;

   @ViewChild("userSwal") userSwal: SwalComponent;
   
   ngAfterViewInit() {
    this.userSwal.show();
  }

  constructor(private userService:UserService,
              private modalService: NgbModal,
              private ref: ChangeDetectorRef) {

                this.userService.getTasks().subscribe(tasks => {
                  // this.tasks = tasks.data;
                  this.tasks = tasks;
                  if(this.tasks){
                    this.tasks = this.tasks.data;
                    this.ref.detectChanges();
                  }
                 });         
       }

  ngOnInit() {

    /*
    this.userService.getTasks().subscribe(tasks => {
     // this.tasks = tasks.data;
     this.tasks = tasks;
     if(this.tasks){
       this.tasks = this.tasks.data;
     }
    }); 

    */
  }

  open(content,processId:string,taskKey:string) {
    this.showDescription(processId,taskKey);
    this.modalService.open(content, { windowClass : "myCustomModalClass", size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  showDescription(processId:string,taskKey:string){
    
    this.processId = processId;
    this.userService.getTask(processId,taskKey).subscribe(task => {
     // this.pdfB64 = this.base64ToArrayBuffer(task.pdfSignedBase64);
     this.userTask = task;
     if(this.userTask){
      this.pdfB64 = this.base64ToArrayBuffer(this.userTask.pdfSignedBase64);
      console.log(this.userTask.pdfSignedBase64);
    }
      this.isTaskActive = true;
    });
  }

  validateSigning(){
    this.dataToSend = {
      "taskName": "sign02",
      "validateConditions":true
    }


    this.userService.signingProcess(this.dataToSend, this.processId)
    .subscribe(
     data => {
        console.log("here is backend data : "+data);
       // this.showSwal.show();  
        this.ngOnInit();
          },
      error =>{
        console.log(error.error.message);
      }
    );
    console.log("check id process : " + this.processId);

  }

  swalWaiting(){
    setTimeout(() => this.userSwal.show(), 3000);
  }

  decliningSigning(){
    this.dataToSend = {
      "taskName": "sign02",
      "validateConditions":false
    }
    
    this.userService.signingProcess(this.dataToSend, this.processId)
    .subscribe(
     data => {
        console.log("here is backend data : "+data);

        // this.userSwal.show();
        // console.log("swal : "+ this.userSwal);

      },
      error =>{
        console.log(error.error.message);
      }
    );
    console.log("check id process : " + this.processId);
    this.ngOnInit();
  }

 swalProcess(showSwal: SwalComponent){
      console.log(showSwal.type);
      if(showSwal.type == 'success'){
       // this.router.navigate(['/home']);
        console.log("wala simo bien joué");
      }else{
        console.log("refused");
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
}
