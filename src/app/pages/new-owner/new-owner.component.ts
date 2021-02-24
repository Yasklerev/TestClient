import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { OwnerService } from 'src/app/services/owner.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

import * as _moment from 'moment';

import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-new-owner',
  templateUrl: './new-owner.component.html',
  styleUrls: ['./new-owner.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NewOwnerComponent implements OnInit {
  date = new FormControl(moment());

  flightSchedule = {
    date: new Date(),
  };

  form: FormGroup;

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthday: ['', Validators.required],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private ownerService: OwnerService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  save() {
    const year = this.form.value.birthday._i.year;
    const month = this.form.value.birthday._i.month;
    const dayDate = this.form.value.birthday._i.date;

    const newDate = year + '-' + month + '-' + dayDate;

    const ownerUpdated = {
      name: this.form.value.name,
      last_name: this.form.value.lastName,
      rut: this.form.value.rut,
      email: this.form.value.email,
      address: this.form.value.address,
      birthday: newDate,
    };

    if (this.form.invalid) {
      console.log('formulario inválidos');
      return;
    }
    this.ownerService.createOwner(ownerUpdated).subscribe(
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
