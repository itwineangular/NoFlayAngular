import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';
import { Constants } from 'src/app/Constants';

export enum FileQueueStatus {
  Pending,
  Success,
  Error,
  Progress
}

export class FileQueueObject {
  public file: any;
  public status: FileQueueStatus = FileQueueStatus.Pending;
  public progress = 0;
  public request: Subscription = null;
  public response: HttpResponse<any> | HttpErrorResponse = null;

  constructor(file: any) {
    this.file = file;
  }

  // actions
  public upload = () => { / set in service / };
  public cancel = () => { / set in service / };
  public remove = () => { / set in service / };

  // statuses
  public isPending = () => this.status === FileQueueStatus.Pending;
  public isSuccess = () => this.status === FileQueueStatus.Success;
  public isError = () => this.status === FileQueueStatus.Error;
  public inProgress = () => this.status === FileQueueStatus.Progress;
  public isUploadable = () => this.status === FileQueueStatus.Pending || this.status === FileQueueStatus.Error;

}

@Injectable()
export class FileuploaderService {

    globalUrl = Constants.HOME_URL;
    public url = this.globalUrl+'/uploadFile';

  private _queue: BehaviorSubject<FileQueueObject[]>;
  private _files: FileQueueObject[] = [];
  public form: any = new FormData();
  constructor(private http: HttpClient) {
    this._queue = <BehaviorSubject<FileQueueObject[]>>new BehaviorSubject(this._files);
  }

  // the queue
  public get queue() {
    return this._queue.asObservable();
  }

  // public events
  public onCompleteItem(queueObj: FileQueueObject, response: any): any {
    return { queueObj, response };
  }

  // public functions
  public addToQueue(data: any) {
    // add file to the queue
    _.each(data, (file: any) => this._addToQueue(file));
  }

  // public clearQueue() {
  //   // clear the queue
  //   this._files = [];
  //   this._queue.next(this._files);
  // }

  public uploadAll(data,type) {
    if(type=="image")
    {
      this.url = this.globalUrl+'/uploadFile';
      this.form.append("instName", data.instName);
    }
    else if(type=="studentImage")
    {     
      this.url = "http://192.168.1.51:8080/students/imageUpload";      
      this.form.append("stdName", data.stdName);
      console.log("stdName", data.stdName);
    }
    else if(type=="file")
    {
      this.url = this.globalUrl+'/students/uploadFile';
      this.form.append("name", data.instName);
    }
    //  this.form.append("instName", data.instName);
    const retval = this._upload(this.form, data);
   
    return retval;
  }

  // private functions
  private _addToQueue(file: any) {
    const queueObj = new FileQueueObject(file);
    this.form.append('file', queueObj.file, queueObj.file.name);
  }

  // private _removeFromQueue(queueObj: FileQueueObject) {
  //   _.remove(this._files, queueObj);
  // }

  private _upload(form, data) {
   
    const req = new HttpRequest('POST', this.url, form, {
      reportProgress: true,
    });
    
    // upload file and report progress
    form.request = this.http.request(req).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this._uploadProgress(form, event);
        } else if (event instanceof HttpResponse) {
          this._uploadComplete(form, event);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this._uploadFailed(form, err);
        } else {
          // The backend returned an unsuccessful response code.
          this._uploadFailed(form, err);
        }
      }
    );

    return 1;
  }

  // private _cancel(queueObj: FileQueueObject) {
  //   // update the FileQueueObject as cancelled
  //   queueObj.request.unsubscribe();
  //   queueObj.progress = 0;
  //   queueObj.status = FileQueueStatus.Pending;
  //   this._queue.next(this._files);
  // }

  private _uploadProgress(queueObj: FileQueueObject, event: any) {
    // update the FileQueueObject with the current progress
    const progress = Math.round(100 * event.loaded / event.total);
    queueObj.progress = progress;
    queueObj.status = FileQueueStatus.Progress;
    this._queue.next(this._files);
  }

  private _uploadComplete(queueObj: FileQueueObject, response: HttpResponse<any>) {
    // update the FileQueueObject as completed
    queueObj.progress = 100;
    queueObj.status = FileQueueStatus.Success;
    queueObj.response = response;
    this._queue.next(this._files);
    this.onCompleteItem(queueObj, response.body);
  }

  private _uploadFailed(queueObj: FileQueueObject, response: HttpErrorResponse) {
    // update the FileQueueObject as errored
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Error;
    queueObj.response = response;
    this._queue.next(this._files);
  }

}