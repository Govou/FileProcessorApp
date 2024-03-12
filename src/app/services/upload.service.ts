import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProcessedOutput } from '../models/processed-output';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor( private http: HttpClient,) { }
  private outcome$ = new BehaviorSubject<any>({});
  producedOutcome$ = this.outcome$.asObservable();

  getProcessedOutcome(formData: any, uploadFileInput: any, fileInputLabel: any):any{
    
    this.http
      .post<any>(environment.apiEndpoint, formData).subscribe(response => {
       
        console.log(response);
        uploadFileInput.nativeElement.value = "";
        fileInputLabel = "";
        let resultStr = JSON.stringify(response)
        // this.outputItem var output = JSON.parse(resultStr);
        var output = JSON.parse(resultStr);
        this.outcome$.next(output);
      }, error => {
        console.log(error);
        return null;
      });
  }
}
