import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PetService } from 'src/app/services/pet.service';
import { AddPetComponent } from '../list-owner/add-pet/add-pet.component';
import { DeletePetComponent } from '../list-owner/pets-owner/delete-pet/delete-pet.component';

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.scss'],
})
export class ListPetComponent implements OnInit {
  pets: any;

  constructor(private petService: PetService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.listAllPets();
  }

  listAllPets() {
    this.petService.getPets().subscribe(
      (data) => {
        this.pets = data;
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  openDialogDelete(id) {
    this.dialog.open(DeletePetComponent, {
      data: {
        id,
      },
    });
  }

  openDialogUpdate(pet) {
    this.dialog.open(AddPetComponent, {
      data: {
        pet,
      },
    });
  }
}
