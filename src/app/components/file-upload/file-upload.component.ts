import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash'
import { ProcessedOutput } from 'src/app/models/processed-output';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef = new ElementRef(null);
  fileUploadForm: FormGroup = new FormGroup({});
  fileInputLabel: string = "";
  outputItem: ProcessedOutput  = new ProcessedOutput();
  noOfCol: string = "0";
  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }

  onFileSelect(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
      if (!_.includes(af, file.type)) {
        this.fileUploadForm.get('myfile')!.reset();//   .setValue(null) ;
        this.fileInputLabel = "Not allowed";
        this.fileUploadForm = this.formBuilder.group({
          myfile: ['']
        });
        alert('Only EXCEL Docs Allowed!');
       

        //return false;
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile')!.setValue(file);
      }
    }
  }


  onFormSubmit() {

    if (!this.fileUploadForm.get('myfile')!.value) {
      alert('Please upload a file!');
   //   return false;
    }

    const formData = new FormData();
    formData.append('formFile', this.fileUploadForm.get('myfile')!.value);

    console.log(this.fileUploadForm.get('myfile')!.value);

    this.uploadService.getProcessedOutcome(formData, this.uploadFileInput, this.fileInputLabel) ;
  }

}
