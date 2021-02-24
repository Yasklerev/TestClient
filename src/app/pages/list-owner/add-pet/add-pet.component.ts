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
import { PetService } from 'src/app/services/pet.service';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
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
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private petService: PetService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  save() {
    const year = this.form.value.birthday._i.year;
    const month = this.form.value.birthday._i.month;
    const dayDate = this.form.value.birthday._i.date;

    const newDate = year + '-' + month + '-' + dayDate;

    const petUpdated = {
      name: this.form.value.name,
      type_pet: this.form.value.type_pet,
      race: this.form.value.race,
      sex: this.form.value.sex,
      birthday: newDate,
      owner: this.data.id,
    };

    console.log(petUpdated);

    if (this.form.invalid) {
      return;
    }

    this.petService.createPet(petUpdated).subscribe(
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
