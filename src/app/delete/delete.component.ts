import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionApiService } from '../service/subscription-api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(public dialogRef:MatDialogRef<DeleteComponent>, private subscription:SubscriptionApiService, @Inject(MAT_DIALOG_DATA) public data:any) {}

  confirmDelete(){
    this.subscription.deleteSubscription(this.data.id).subscribe(() => {
      this.dialogRef.close(this.data.id);
    })
  }
}
