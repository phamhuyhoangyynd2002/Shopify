import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-products-status',
  templateUrl: './update-products-status.component.html',
  styleUrls: ['./update-products-status.component.scss']
})
export class UpdateProductsStatusComponent {

  listProducts: any[] = [];
  listProductsStatusUpdateHistory: any[] = [];
  // http://192.168.96.18:4300
  ipBackend: string = 'http://192.168.96.18:4300/';
  productsStatusDraft: string = this.ipBackend +"productsstatusdraft";
  turnOnSchedule: string = this.ipBackend +"turnonschedule";
  updateProductsstatus: string = this.ipBackend +"updateproductsstatus";
  productsStatusUpdateHistory: string = this.ipBackend +"productstatusupdatehistory";
  deleteProductsStatusUpdateHistory: string = this.ipBackend +"deleteproductstatusupdatehistory";
  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.http.get(this.productsStatusDraft).subscribe((resultData: any) => {
      this.listProducts = resultData.data;
    });

    this.http.get(this.productsStatusUpdateHistory).subscribe((resultData: any) => {
      this.listProductsStatusUpdateHistory = resultData.data;
    });
  }

  async schedule(id: number, time: number) {
    /*
    const product_Schedule = document.querySelectorAll('.product_id');
    const product_Schedule_time = document.querySelectorAll('.product_Schedule_time');
    for (let i = 0; i < product_Schedule.length; i++) {
      if( product_Schedule[i].innerHTML == id.toString()) { 
        console.log(i);
        product_Schedule_time[i].classList.remove('hidden');
        break;
      }
    }
    */
    let bodydata = { "id": id, "time": time };
    this.http.post(this.turnOnSchedule, bodydata).subscribe(async (resultData: any) => {
      if (resultData.status == false) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: resultData.data,
          confirmButtonText: 'Ok'
        });
        await this.http.get(this.productsStatusDraft).subscribe((result: any) => {
          this.listProducts = result.data;
        });
        this.http.get(this.productsStatusUpdateHistory).subscribe((resultData: any) => {
          this.listProductsStatusUpdateHistory = resultData.data;
        });
      }
      else {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successful!',
          confirmButtonText: 'Ok'
        });
        await this.http.get(this.productsStatusDraft).subscribe((result: any) => {
          this.listProducts = result.data;
        });
        this.http.get(this.productsStatusUpdateHistory).subscribe((resultData: any) => {
          this.listProductsStatusUpdateHistory = resultData.data;
        });
      }
    });
  }

  updateProductsStatus(id: number, title: string, handle: string) {
    let bodydata = { "id": id, "title": title, "handle": handle };
    this.http.post(this.updateProductsstatus, bodydata).subscribe(async (resultData: any) => {
      if (resultData.status == false) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: resultData.data,
          confirmButtonText: 'Ok'
        });
        await this.http.get(this.productsStatusDraft).subscribe((result: any) => {
          this.listProducts = result.data;
        });
        this.http.get(this.productsStatusUpdateHistory).subscribe((resultData: any) => {
          this.listProductsStatusUpdateHistory = resultData.data;
        });
      }
      else {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successful!',
          confirmButtonText: 'Ok'
        });
        await this.http.get(this.productsStatusDraft).subscribe((result: any) => {
          this.listProducts = result.data;
        });
        this.http.get(this.productsStatusUpdateHistory).subscribe((resultData: any) => {
          this.listProductsStatusUpdateHistory = resultData.data;
        });
      }
    });
  }

  deleteProductStatusUpdateHistory(id: number){
    let bodydata = { "id": id};
    this.http.post(this.deleteProductsStatusUpdateHistory, bodydata).subscribe(async (resultData: any) => {
      if (resultData.status == false) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: resultData.data,
          confirmButtonText: 'Ok'
        });
        await this.http.get(this.productsStatusDraft).subscribe((result: any) => {
          this.listProducts = result.data;
        });
        this.http.get(this.productsStatusUpdateHistory).subscribe((resultData: any) => {
          this.listProductsStatusUpdateHistory = resultData.data;
        });
      }
      else {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successful!',
          confirmButtonText: 'Ok'
        });
        await this.http.get(this.productsStatusDraft).subscribe((result: any) => {
          this.listProducts = result.data;
        });
        this.http.get(this.productsStatusUpdateHistory).subscribe((resultData: any) => {
          this.listProductsStatusUpdateHistory = resultData.data;
        });
      }
    });
  }
}

