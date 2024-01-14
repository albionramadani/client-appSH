
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../interfaces/product-model';
import { AddProductDialogComponent } from '../add-products-dialog/add-products-dialog.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MessageService } from '../services/messages-service';
import { ProductsService } from '../services/products-service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Data } from '../interfaces/route-data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsPageComponent implements OnInit{
asWishList: boolean | null = false;

  constructor(private dialog: MatDialog,
    private messageService: MessageService,
    private productService: ProductsService,
    private route: ActivatedRoute) {}

  ngOnInit(){
    this.route.data.pipe(take(1))
    .subscribe(({asWishlist}) =>{
       this.asWishList = asWishlist
      });
    this.getAllProducts();
  }
  private getAllProducts(){
    this.productService.getAllproducts(this.asWishList ?? false).subscribe(x=>{
      this.productService.products.next(x);
    })
  }
  get products():Product[] {
    return this.productService.products.value;
  };

  protected toggle(id:string){
    this.productService.toogleFavoritProduct(id)
    .subscribe(x=>{
      this.getAllProducts();
    })
  }
  openAddProductForm(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       this.productService.addOrUpdate(result).subscribe(x=>{
        this.messageService.openSucess('product is added successfully');
        this.getAllProducts();
       })
      }
    });
  }


  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent,{
      width: '640px',
      disableClose: true,
      data: {product:product}
    });

    dialogRef.afterClosed().subscribe((result: Product | null) => {
      if (result) {
        this.productService.addOrUpdate(result).subscribe(x=>{
          this.messageService.openSucess('product is added successfully');
          this.getAllProducts();});
      }
    });
  }

  deleteProduct(product: Product): void {
    this.dialog.open(DialogConfirmComponent,{
      width: '640px',
      disableClose: true,
      data: {message:'Are you sure that you want to delete this product?'}
    }).afterClosed().subscribe((x:boolean)=>{
    if(x)
    {
      this.productService.delete(product.id!).subscribe(x=>{
        this.messageService.openSucess('product is deleted successfully');
        this.getAllProducts();
      })
    }
    });
  }
}
