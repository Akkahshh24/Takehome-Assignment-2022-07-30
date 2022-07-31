import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product:Product = new Product();
  editable:boolean = false;

  constructor(
    private productService:ProductService,
    private route:Router,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {this.getProductById()});
  }

  getProductById() {
    const id = +this.activatedRoute.snapshot.paramMap.get("id");
    if(id > 0){
      this.editable = true;
      this.productService.getProductById(id).subscribe(data => {this.product = data});
    }
  }

  addProduct(){
    if(this.editable){
      this.productService.updateProduct(this.product).subscribe(data => {
        console.log(data)
        this.route.navigateByUrl("/productList");
      })
    }
    else{
    this.productService.saveProduct(this.product).subscribe(data => {
      console.log(data);
      this.route.navigateByUrl("/productList");
    });
    }
  }

}
