import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OwnerService } from 'src/app/services/owner.service';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetService } from 'src/app/services/pet.service';
import { locale } from 'moment';
@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent implements OnInit {
  edit = false;
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
    @Inject(MAT_DIALOG_DATA) public data: { id: number; pet: any },
    private petService: PetService,
    public dialog: MatDialog
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.data.pet) {
      this.edit = true;
      this.form = this.formBuilder.group({
        id: [this.data.pet.id],
        name: [this.data.pet.namePet, [Validators.required]],
        type_pet: [this.data.pet.type_pet, [Validators.required]],
        race: [this.data.pet.race, [Validators.required]],
        sex: [this.data.pet.sex, [Validators.required]],
        birthday: [this.data.pet.birthday, [Validators.required]],
      });
    }
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const pet = {
      name: this.form.value.name,
      type_pet: this.form.value.type_pet,
      race: this.form.value.race,
      sex: this.form.value.sex,
      birthday: this.form.value.birthday,
      owner: this.data.id,
    };

    this.petService.createPet(pet).subscribe(
      (data) => {
        console.log('Mascoota creada');
        this.dialog.closeAll();
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  update() {
    this.petService.updatePet(this.form.value).subscribe(
      (data) => {
        this.dialog.closeAll();
        location.reload();
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }
}
