import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../services/example.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  errMessage: string="";
  product:Product = new Product();
  constructor(private _service: ExampleService, private _toast:ToastrService) { }

  

  ngOnInit(): void {
    this._service.getPDList().subscribe({
      next: data =>this.products = data,
      error: err => this.errMessage = err
    })
  }

  submitData(form:NgForm){
    // console.log("Form data: ",form.value);
     console.log("Model: ",this.product);
    if(this.product._id==''){
      this._service.postProduct(this.product).subscribe(res => {
        // console.log("Res: ",res);
        let resData = JSON.parse(JSON.stringify(res));
        if(resData.message === "success"){
        //  alert("Success!"); 
        this._toast.success("Inserted successfully!", "Insert");
         this.getProducts();
         this.onReset();
        }else{
          alert("Fail!");
        }
      })
    }else{
      this._service.updateProduct(this.product._id, this.product).subscribe(res => {
        let resData = JSON.parse(JSON.stringify(res));
        if(resData.message === "success"){
        //  alert("Update successfully!");
         this._toast.info("Update Successfully!", "Update");
         this.onReset();
         this.getProducts(); 
        }else{
          alert("Fail!");
        }
      })
    }
    
  }
  edit(data:Product){
    console.log(data);
    this.product=data;
  }
  delete(id:any,form:NgForm){
    if(confirm(`Are you sure you want to delete this products?`)==true){
      this._service.deleteProduct(id).subscribe(res=>{
        let resData=JSON.parse(JSON.stringify(res));
        if(resData.message==="success"){
          // alert("Deleted Successfully!");
          this._toast.warning("Deleted Successfully!", "Delete",{
            timeOut:5000,
            progressBar:false
          });
          this.onReset(form);
          this.getProducts();
        }else{
          alert(resData.message);
        }
      });
    }
    
  }
  onReset(form?:NgForm){
    if(form)
      form.reset();
    this.product=new Product();
  }
  getProducts(){
    this._service.getPDList().subscribe({
      next:data=>this.products=data,
      error:err=>this.errMessage=err
    })
  }
// submit(): void{
//   this.regForm.patchValue({
//     stt: 1,
//     pName: "Heneiken",
//     pPrice: 19000
//   })

// public regForm: FormGroup = new FormGroup({
//   stt: new FormControl('1'),
//   pName: new FormControl('khanhchieu')
// })
}
