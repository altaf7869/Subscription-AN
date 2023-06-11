import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionApiService } from '../service/subscription-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptionForm: FormGroup;
  todayDate:Date = new Date();

  constructor(private _fb: FormBuilder, private _subscriptionService:SubscriptionApiService,
     private _dialogRef: MatDialogRef<SubscriptionComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,
     private _coreService: CoreService
     ){
  
    this.subscriptionForm = this._fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      startTime:  ['',[Validators.required]],
      endTime:  ['', Validators.required],
      
    })
  }
  
  ngOnInit(): void {
    this.subscriptionForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.subscriptionForm.valid){
      if(this.data){
        this._subscriptionService.updateSubscription(this.data.id ,this.subscriptionForm.value).subscribe({
          next:(val: any) => {
            this._coreService.openSnackBar('Subscription updated successfully')
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        })
      }else{
        this._subscriptionService.addSubscription(this.subscriptionForm.value).subscribe({
          next:(val: any) => {
            this._coreService.openSnackBar('Subscription added successfully')
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        })
      }
     
    }
  }
  }
  