import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';
import { FormBuilder } from '@angular/forms';
import { FormGroup , FormsModule} from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit {
  body:string;
  tasks:any = [];
  inputValue;
  notifObj;
  notifBody;
  srcPdfs :  Array<any> = [];
  pdfs : Array<any> = [];
  fileName: string;
  emails = [];
  dataToSend: any;
  sendingStatus: boolean;
  statusCode:string;

  @ViewChild("showSwal") showSwal: SwalComponent;



  constructor(private userService:UserService,
              private formBuilder: FormBuilder) {
      this.userService.getBlockchainTransactions().subscribe(tasks => {
        this.tasks = tasks;
        if(this.tasks){
          this.tasks = this.tasks;
        }
       });         
  }

  ngOnInit() {
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


  onKeyMail(event) {
    this.inputValue = event.target.value;
    console.log(this.inputValue);
    }
  

    onKeyObj(event){
      this.notifObj = event.target.value;
      console.log(this.notifObj);
    }
    onKey(event){
      this.notifBody = event.target.value;
      console.log(this.notifBody);
    }
  
  addSigner(){
    this.emails.push(this.inputValue);
    var itm = <HTMLInputElement>document.getElementById("mailForm").lastChild;
    itm.disabled = true;
    var br = document.createElement('br');
    var cln = <HTMLInputElement>itm.cloneNode(true);
    cln.disabled = false;
    cln.value = "";
    document.getElementById("mailForm").appendChild(br);
    document.getElementById("mailForm").appendChild(cln);
    var addedItm = document.getElementById("mailForm").lastElementChild;
    addedItm.addEventListener("keyup",(e) => {
     // console.log(event.target.value);
     let element = event.currentTarget as HTMLInputElement;
      this.inputValue = element.value;
    });
  }

  onStep1Next(event){
    console.log("step1");
  }

  onStep2Next(event){
    console.log("step2");
  }

  onStep3Next(event){
    console.log("step3");
  }

  onComplete(event){
    this.dataToSend = {
      "usageId":"b72751fd-5ca4-11e9-8fe5-0242ac110006",
      "taskName": "sign01",
      "pdfB64":this.pdfs[0],
      "mails":this.emails,
      "notifSubject": this.notifObj,
      "notifBody": this.notifBody
  }
    console.log("finished");
    this.sendObj();
  }

  sendObj(){
    console.log("ha chno ghadi nlo7 lserver lol : " + this.dataToSend);
    this.userService.sendDataToBlockchain(this.dataToSend)
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
      },
      error => {
        this.sendingStatus = false;
        console.log(error.error.message.split(' ')[1]);
        this.statusCode = error.error.message;
        setTimeout(() => {
          this.showSwal.show();
        }, 1000);     
      }
    );
  }


}