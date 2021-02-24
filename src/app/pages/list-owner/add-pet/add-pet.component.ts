import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent implements OnInit {
  date = new FormControl(moment());

  flightSchedule = {
    date: new Date(),
  };

  form: FormGroup;

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      type_pet: ['', [Validators.required]],
      race: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private ownerService: OwnerService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  save() {
    const year = this.form.value.birthday._i.year;

    console.log(year);

    const month = this.form.value.birthday._i.month;
    const dayDate = this.form.value.birthday._i.date;

    const newDate = year + '-' + month + '-' + '0' + dayDate;

    const petUpdated = {
      name: this.form.value.name,
      last_name: this.form.value.lastName,
      rut: this.form.value.rut,
      email: this.form.value.email,
      address: this.form.value.address,
      birthday: newDate,
      owner: this.data.id,
    };

    console.log(petUpdated);

    if (this.form.invalid) {
      console.log('formulario inválidos');
      return;
    }
  }
}
