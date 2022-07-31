import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category:Category = new Category();
  editable:boolean = false;

  constructor(
    private categoryService:CategoryService,
    private route:Router,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {this.getCategoryById()});
  }

  getCategoryById() {
    const id = +this.activatedRoute.snapshot.paramMap.get("id");
    if(id > 0){
      this.editable = true;
      this.categoryService.getCategoryById(id).subscribe(data => {this.category = data});
    }
  }

  addCategory(){
    if(this.editable){
      this.categoryService.updateCategory(this.category).subscribe(data => {
        console.log(data)
        this.route.navigateByUrl("/categoryList");
      })
    }
    else{
    this.categoryService.saveCategory(this.category).subscribe(data => {
      console.log(data);
      this.route.navigateByUrl("/categoryList");
    });
    }
  }

}
