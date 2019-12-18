import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetjobService } from '../../getjob.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  formgroup = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ])
  });
  constructor(
    private getAllJobService: GetjobService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  onSubmit() {
    this.getAllJobService
      .createNewCategory(this.formgroup.value)
      .subscribe(data => {
        if (data.status == 'true') {
          this.toastr.success('Category Added');
          this.formgroup.reset();
        }
      });
  }
}
