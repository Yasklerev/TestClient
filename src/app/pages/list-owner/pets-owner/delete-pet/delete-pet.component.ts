import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.scss'],
})
export class DeletePetComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number; namePet: string },
    private petService: PetService,
    public dialogRef: MatDialogRef<DeletePetComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  deletePet(id: number) {
    this.petService.deletePet(id).subscribe(
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

  noDelete() {
    this.dialogRef.close();
  }
}
