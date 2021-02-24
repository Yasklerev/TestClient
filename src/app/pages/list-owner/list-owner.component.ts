import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/models/owner';
import { OwnerService } from 'src/app/services/owner.service';
import { PetService } from 'src/app/services/pet.service';
import { MatDialog } from '@angular/material/dialog';
import { PetsOwnerComponent } from './pets-owner/pets-owner.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { DeleteOwnerComponent } from './delete-owner/delete-owner.component';

@Component({
  selector: 'app-list-owner',
  templateUrl: './list-owner.component.html',
  styleUrls: ['./list-owner.component.scss'],
})
export class ListOwnerComponent implements OnInit {
  owners: Owner;
  pets: any;
  progress = true;

  constructor(
    private ownerService: OwnerService,
    private petService: PetService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.progress = false;
    }, 500);

    this.listAllOwners();
  }

  listAllOwners() {
    this.ownerService.getOwners().subscribe(
      (data) => {
        this.owners = data;
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  openDialogListPets(id, name) {
    this.dialog.open(PetsOwnerComponent, {
      data: {
        id,
        name,
      },
    });
  }

  openDialogAddPet(id) {
    this.dialog.open(AddPetComponent, {
      data: {
        id,
      },
    });
  }

  openDialogDelete(id, name) {
    this.dialog.open(DeleteOwnerComponent, {
      data: {
        id,
        name,
      },
    });
  }
}
