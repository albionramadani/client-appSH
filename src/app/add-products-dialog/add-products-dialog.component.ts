import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../interfaces/product-model';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: '../add-products-dialog/add-products-dialog.component.html'
})
export class AddProductDialogComponent {
  productForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {product:Product}
  ) {
    this.productForm = this.fb.group({
      id: new FormControl<string | null>(null),
      name:  new FormControl<string | null>(null, Validators.required),
      description: new FormControl<string | null>(null,Validators.required),
      price: new FormControl<number | null>(null, Validators.required),
    });
  }
  ngOnInit(): void {
    this.updateForm(this.data?.product)
  }

  updateForm(product: Product | null)
  {
     this.productForm.patchValue({
      id: product?.id,
      name: product?.name,
      description: product?.description,
      price: product?.price,
     })
  }

  save(): void {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value as Product);
    }
    else{
      this.productForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
