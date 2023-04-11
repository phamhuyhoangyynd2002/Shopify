import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})

export class CreateProductComponent {
  title: string = "";
  body_html: string = "";
  vendor: string = "";
  product_type: string = "";
  status: string = "draft";
  images: string = "";

  option_First: boolean = false;
  price_First: string = "";
  sku_First: string = "";
  inventory_management_First: string = "shopify";
  inventory_quantity_First: number = 0;
  weight_First: number = 0;
  weight_unit_First: string = "";
  images_First: string = "";

  option_Second: boolean = false;
  price_Second: string = "";
  sku_Second: string = "";
  inventory_management_Second: string = "shopify";
  inventory_quantity_Second: number = 0;
  weight_Second: number = 0;
  weight_unit_Second: string = "";
  images_Second: string = "";

  option_Third: boolean = false;
  price_Third: string = "";
  sku_Third: string = "";
  inventory_management_Third: string = "shopify";
  inventory_quantity_Third: number = 0;
  weight_Third: number = 0;
  weight_unit_Third: string = "";
  images_Third: string = "";

  metaFields_Email: string = "";
  metaFields_Color: string = "";
  metaFields_Size: string = "";
  metaFields_Length: string = "";
  metaFields_Weight: string = "";
  metaFields_Capacity: string = "";
  metaFields_Material: string = "";
  metaFields_Country_of_origin:string = "";


  constructor(private http: HttpClient, private router: Router, private SpinnerService: NgxSpinnerService) {
  }

  post() {
    this.SpinnerService.show();
    let variants = [];
    let error = false;
    if (this.option_First == true) {

      let option = {
        "option1": "First",
        "price": this.price_First,
        "sku": this.sku_First,
        "inventory_management": this.inventory_management_First,
        "inventory_quantity": this.inventory_quantity_First,
        "weight": this.weight_First,
        "weight_unit": this.weight_unit_First,
        "images": this.string_images_to_array_images(this.images_First),
        "image": null
      }
      variants.push(option);
    }

    if (this.option_Second == true) {
      let option = {
        "option1": "Second",
        "price": this.price_Second,
        "sku": this.sku_Second,
        "inventory_management": this.inventory_management_Second,
        "inventory_quantity": this.inventory_quantity_Second,
        "weight": this.weight_Second,
        "weight_unit": this.weight_unit_Second,
        "images": this.string_images_to_array_images(this.images_Second),
        "image": null
      }
      variants.push(option);
    }

    if (this.option_Third == true) {
      let option = {
        "option1": "Third",
        "price": this.price_Third,
        "sku": this.sku_Third,
        "inventory_management": this.inventory_management_Third,
        "inventory_quantity": this.inventory_quantity_Third,
        "weight": this.weight_Third,
        "weight_unit": this.weight_unit_Third,
        "images": this.string_images_to_array_images(this.images_Third),
        "image": null
      }
      variants.push(option);
    }

    let metafields = [
      {
        "key": "email_user",
        "namespace": "custom",
        "value": this.metaFields_Email,
        "type": "single_line_text_field"
      },
      {
        "key": "color",
        "namespace": "custom",
        "value": this.string_color_to_array_color(this.metaFields_Color),
        "type": "list.single_line_text_field"
      },
      {
        "key": "capacity",
        "namespace": "custom",
        "value": this.metaFields_Capacity,
        "type": "single_line_text_field"
      },
      {
        "key": "length",
        "namespace": "custom",
        "value": this.metaFields_Length,
        "type": "single_line_text_field"
      },
      {
        "key": "material",
        "namespace": "custom",
        "value": this.metaFields_Material,
        "type": "single_line_text_field"
      },
      {
        "key": "size",
        "namespace": "custom",
        "value": this.metaFields_Size,
        "type": "single_line_text_field"
      },
      {
        "key": "country_of_origin",
        "namespace": "custom",
        "value": this.metaFields_Country_of_origin,
        "type": "single_line_text_field"
      },
      {
        "key": "weight",
        "namespace": "custom",
        "value": this.metaFields_Weight,
        "type": "single_line_text_field"
      },
    ]
    let product = {
      "title": this.title,
      "body_html": this.body_html,
      "vendor": this.vendor,
      "product_type": this.product_type,
      "status": this.status,
      "metafields": metafields,
      "variants": variants,
      "images": this.string_images_to_array_images(this.images),
      "image": null
    }
    let bodyData = { "product": product };
    if (this.title == "") {
      this.SpinnerService.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Please fill in more information 'Title' !",
        confirmButtonText: 'Ok'
      });
    }
    else if (this.vendor == "") {
      this.SpinnerService.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Please fill in more information 'Vendor' !",
        confirmButtonText: 'Ok'
      });
    }
    else if (this.metaFields_Email == "" || this.metaFields_Email.indexOf("@gmail.com") <= 0 ) {
      this.SpinnerService.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Please fill in more information 'Email' !",
        confirmButtonText: 'Ok'
      });
    }
    else if (this.sku_First == "" && this.option_First == true) {
      this.SpinnerService.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Please fill in more information 'Sku' First !",
        confirmButtonText: 'Ok'
      });
    }
    else if (this.sku_Second == "" && this.option_Second == true) {
      this.SpinnerService.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Please fill in more information 'Sku' Second !",
        confirmButtonText: 'Ok'
      });
    }
    else if (this.sku_Third == "" && this.option_Third == true) {
      this.SpinnerService.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Please fill in more information 'Sku' Third !",
        confirmButtonText: 'Ok'
      });
    }
    else {
      this.http.post("http://192.168.96.18:4300/", bodyData).subscribe((resultData: any) => {
        if (resultData.status == true) {
          this.SpinnerService.hide();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'More successful products!',
            confirmButtonText: 'Ok'
          });
          this.title = "";
          this.body_html = "";
          this.vendor = "";
          this.product_type = "";
          this.status = "draft";
          this.images = "";

          this.option_First = false;
          this.price_First = "";
          this.sku_First = "";
          this.inventory_management_First = "";
          this.inventory_quantity_First = 0;
          this.weight_First = 0;
          this.weight_unit_First = "";
          this.images_First = "";

          this.option_Second = false;
          this.price_Second = "";
          this.sku_Second = "";
          this.inventory_management_Second = "";
          this.inventory_quantity_Second = 0;
          this.weight_Second = 0;
          this.weight_unit_Second = "";
          this.images_Second = "";

          this.option_Third = false;
          this.price_Third = "";
          this.sku_Third = "";
          this.inventory_management_Third = "";
          this.inventory_quantity_Third = 0;
          this.weight_Third = 0;
          this.weight_unit_Third = "";
          this.images_Third = "";

          this.metaFields_Email ="";
          this.metaFields_Color = "";
          this.metaFields_Size = "";
          this.metaFields_Length = "";
          this.metaFields_Weight = "";
          this.metaFields_Capacity = "";
          this.metaFields_Material = "";
          this.metaFields_Country_of_origin = "";
          this.removeDiv1();
          this.removeDiv2();
          this.removeDiv3();
        }
        else {
          this.SpinnerService.hide();
          console.log(resultData.data);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: resultData.data,
            confirmButtonText: 'Ok'
          });
        }
      })
    }
  }
  addOption() {
    const divs = document.querySelectorAll('.form-options');
    if (this.option_First == false) {
      this.option_First = true;
      divs[0].classList.remove('hidden');
    }
    else if (this.option_Second == false) {
      this.option_Second = true;
      divs[1].classList.remove('hidden');
    }
    else if (this.option_Third == false) {
      this.option_Third = true;
      divs[2].classList.remove('hidden');
    }
    else {
      alert("The number of options max is three");
    }

  }
  removeDiv1() {
    const divs = document.querySelectorAll('.form-options');
    this.option_First = this.option_Second;
    this.price_First = this.price_Second;
    this.sku_First = this.sku_Second;
    this.inventory_management_First = this.inventory_management_Second;
    this.inventory_quantity_First = this.inventory_quantity_Second;
    this.weight_First = this.weight_Second;
    this.weight_unit_First = this.weight_unit_Second;
    this.images_First = this.images_Second;
    if (this.option_Second == false) divs[0].classList.add('hidden');
    else this.removeDiv2();
  }
  removeDiv2() {
    const divs = document.querySelectorAll('.form-options');
    this.option_Second = this.option_Third;
    this.price_Second = this.price_Third;
    this.sku_Second = this.sku_Third;
    this.inventory_management_Second = this.inventory_management_Third;
    this.inventory_quantity_Second = this.inventory_quantity_Third;
    this.weight_Second = this.weight_Third;
    this.weight_unit_Second = this.weight_unit_Third;
    this.images_Second = this.images_Third;
    if (this.option_Third == false) divs[1].classList.add('hidden');
    else this.removeDiv3();
  }
  removeDiv3() {

    const divs = document.querySelectorAll('.form-options');
    this.option_Third = false;
    this.price_Third = '';
    this.sku_Third = '';
    this.inventory_management_Third = '';
    this.inventory_quantity_Third = 0;
    this.weight_Third = 0;
    this.weight_unit_Third = '';
    this.images_Third = '';
    divs[2].classList.add('hidden');
  }
  string_images_to_array_images(images: string) {
    let string_images = images.replace(/\s+/g, '');;
    let array_images = [];
    let image = '';
    for (let i = 0; i < string_images.length; i++) {
      if (string_images[i] == 'h' && i < string_images.length - 9) {
        if (string_images[i + 1] == 't' && string_images[i + 2] == 't' && string_images[i + 3] == 'p'
          && ((string_images[i + 4] == 's' && string_images[i + 5] == ':' && string_images[i + 6] == '/' && string_images[i + 7] == '/') 
          || (string_images[i + 4] == ':' && string_images[i + 5] == '/' && string_images[i + 6] == '/'))
          && image != '') {
          array_images.push({ "src": image });

          image = '';
        }
      }
      if (string_images[i] != ' ') image = image + string_images[i];
    }
    if (image != '') array_images.push({ "src": image });
    return array_images;
  }
  string_color_to_array_color(color: string) {
    let string_color = color.replace(/\s+/g, '');
    let array_color = "[";
    let a_color = '';
    if (string_color == "") return "";
    let t = true;
    for (let i = 0; i < string_color.length; i++) {
      if (string_color[i] == ',' && a_color != '') {
        if (t = true) { array_color += "\"" + a_color + "\""; t = false; }
        else array_color += ",\"" + a_color + "\"";
        a_color = ""
      }
      else a_color += string_color[i]
    }
    if (t == true) array_color += "\"" + a_color + "\"";
    else array_color += ",\"" + a_color + "\"";
    array_color += "]";
    return array_color;
  }

  
}