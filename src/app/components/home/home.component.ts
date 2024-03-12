import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProcessedOutput } from 'src/app/models/processed-output';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef = new ElementRef(null);
  fileUploadForm: FormGroup = new FormGroup({});
  @ViewChild('mean') myInputVariable!: ElementRef;

  fileInputLabel: string = "";
   item = new ProcessedOutput();
  noOfCol: string = "0";
  constructor(
    private uploadService: UploadService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });

    this.uploadService.producedOutcome$.subscribe((value) => {
      this.item = value;
      console.log(value);
    });
  }

  resetForm(){
    this.myInputVariable.nativeElement.value = '';
  }


reset() {
    this.myInputVariable.nativeElement.value = '';
}

}
