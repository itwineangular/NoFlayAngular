// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class FileuploaderServiceService {

//   constructor() { }
// }

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs'
// import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

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

  public url = '/api/assets/asset-preregistration/assetpreregistration';

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
  public addToQueue(data: any, i) {
    // add file to the queue
    _.each(data, (file: any) => this._addToQueue(file, i));
  }

  public clearQueue() {
    // clear the queue
    this._files = [];
    this._queue.next(this._files);
  }

  public uploadAll(data) {
    // upload all except already successfull or in progress
    // const form = new FormData();
    // _.each(this._files, (queueObj2: FileQueueObject) => {
    //   if (queueObj2.isUploadable()) {

    //     console.log(queueObj2.file.name);
    //     this.form.append('file[' + i + ']', queueObj2.file, queueObj2.file.name);

    //     this.form.append('data', data.ponumber);
    //   }

    // });
    // console.log(data);
    this.form.append('data[ponumber]', data.ponumber);
    this.form.append('data[grn]', data.grn);
    // for (let i = 0; i < data.assetelements.length; i++ ) {
    this.form.append('data[idpo]', data.idpo);
    this.form.append('data[itemid]', data.item);
    this.form.append('data[quantity]', data.quantity);
    this.form.append('data[assetcategoryid]', data.assetcategory);
    this.form.append('data[assetsubcategoryid]', data.assetsubcategory);
    this.form.append('data[assettypeid]', data.assettype);
    this.form.append('data[glcode]', data.glcode);
    this.form.append('data[staff]', data.staff);
    this.form.append('data[department]', data.department);
    // }
    const retval = this._upload(this.form, data);
    return retval;
  }

  // private functions
  private _addToQueue(file: any, i) {
    const queueObj = new FileQueueObject(file);

    // // set the individual object events
    // queueObj.upload = () => this._upload(queueObj, '');
    // queueObj.remove = () => this._removeFromQueue(queueObj);
    // queueObj.cancel = () => this._cancel(queueObj);

    // push to the queue
    // for (let i = 0; i < 2; i++) {
    //   console.log(queueObj.file.name);
    //   this.form.append('file[' + i + ']', queueObj.file, queueObj.file.name);
    // }


    this.form.append('file[' + i + ']', queueObj.file, queueObj.file.name);
    // this._files.push(queueObj);
    // this.clearQueue();
    // this._queue.next(this._files);
  }

  private _removeFromQueue(queueObj: FileQueueObject) {
    _.remove(this._files, queueObj);
  }

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

  private _cancel(queueObj: FileQueueObject) {
    // update the FileQueueObject as cancelled
    queueObj.request.unsubscribe();
    queueObj.progress = 0;
    queueObj.status = FileQueueStatus.Pending;
    this._queue.next(this._files);
  }

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
