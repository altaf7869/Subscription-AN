import { Component, ViewChild } from '@angular/core';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DeleteComponent } from './delete/delete.component';
import { SubscriptionApiService } from './service/subscription-api.service';
import { CoreService } from './core/core.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Subscription-AN';
  
  allEmployees = [];

  displayedColumns: string[] = [
    'id',
     'name',
      'date', 'startTime','endTime','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog:MatDialog,
     private _subscriptionService: SubscriptionApiService,
     private _coreService:CoreService){}

  ngOnInit(): void {
    this.getSubscriptionList();
  }
  openAddEditForm() {
    const dialogRef = this._dialog.open(SubscriptionComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getSubscriptionList();
      }
    })
  }

  getSubscriptionList(){
    this._subscriptionService.getSubscription().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // deleteEmployee(id: number) {
  //   this._empService.deleteEmployee(id).subscribe({
  //     next: (res) => {
  //       this._coreService.openSnackBar('Employee Deleted Successfully!', 'done')
  //       this.getEmployeeList();
  //     },
  //     error: console.log,
  //   })
  // }

  deleteSubscription(id: number) {
    const deleteConfirm = this._dialog.open(DeleteComponent, {
      width:'200px',
      data:{id}
    });
    deleteConfirm.afterClosed().subscribe((res) => {
      if(res){
        this._subscriptionService.deleteSubscription(id);
        this._coreService.openSnackBar('Subscription Successfully Deleted!', 'done')
        this.getSubscriptionList();
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(SubscriptionComponent,{
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getSubscriptionList();
      }
    })
  }

  openDeleteModel(id:number){
    const deleteConfirm = this._dialog.open(DeleteComponent, {
      width:'250px',
      data:{id}
    });
    deleteConfirm.afterClosed().subscribe((res) => {
      if(res){
        this.getSubscriptionList();
      }
    })
  }
}

