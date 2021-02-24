import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { OwnerService } from 'src/app/services/owner.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-owner',
  templateUrl: './new-owner.component.html',
  styleUrls: ['./new-owner.component.scss'],
})
export class NewOwnerComponent implements OnInit {
  edit = false;
  form: FormGroup;

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthday: ['', Validators.required],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.ownerService.getOwner(params.id).subscribe(
        (data) => {
          this.form = this.formBuilder.group({
            id: [data[0].id],
            name: [data[0].name, [Validators.required]],
            last_name: [data[0].last_name, [Validators.required]],
            rut: [data[0].rut, [Validators.required]],
            email: [data[0].email, [Validators.required]],
            address: [data[0].address, [Validators.required]],
            birthday: [data[0].birthday, [Validators.required]],
          });
          this.edit = true;
        },
        (err) => {
          console.warn('Hubo un error!');
          console.warn(err);
        }
      );
    }
  }

  save(): void {
    if (this.form.invalid) {
      console.log('formulario inválidos');
      return;
    }
    this.ownerService.createOwner(this.form.value).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  editOwner(): void {
    this.ownerService.updateOwner(this.form.value).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }
}
