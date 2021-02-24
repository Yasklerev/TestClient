import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { PetService } from 'src/app/services/pet.service';
import { DeletePetComponent } from './delete-pet/delete-pet.component';

@Component({
  selector: 'app-pets-owner',
  templateUrl: './pets-owner.component.html',
  styleUrls: ['./pets-owner.component.scss'],
})
export class PetsOwnerComponent implements OnInit {
  pets: any;
  state = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string },
    private petService: PetService,
    public dialog: MatDialog,
    public dialogRefDelete: MatDialogRef<DeletePetComponent>,
    public dialogRef: MatDialogRef<PetsOwnerComponent>
  ) {}

  ngOnInit(): void {
    this.petService.getPet(this.data.id).subscribe(
      (data) => {
        if (Object.entries(data).length > 0) {
          this.state = true;
        } else {
          this.state = false;
        }
        this.pets = data;
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  openDialog(id, namePet) {
    this.dialog.open(DeletePetComponent, {
      data: {
        id,
        namePet,
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
