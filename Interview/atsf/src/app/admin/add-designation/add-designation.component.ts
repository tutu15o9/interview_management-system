import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { categoryData, genreData } from '../../interfaces';
import { GetCategoryService } from '../../get-category.service';
import { GetjobService } from '../../getjob.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {
  formgroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    designation: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ])
  });
  category: categoryData[];

  constructor(
    private getAllCategoryService: GetCategoryService,
    private getAllJobService: GetjobService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllCategoryService.getAllCategory().subscribe(data => {
      this.category = data;
    });
  }
  onSubmit() {
    this.getAllJobService
      .createNewDesignation(this.formgroup.value)
      .subscribe(data => {
        if (data.status === 'true') this.toastr.success('Designation Added');
        this.formgroup.reset();
      });
  }
}
