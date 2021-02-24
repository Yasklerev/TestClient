import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OwnerService } from 'src/app/services/owner.service';
import { PetService } from 'src/app/services/pet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-owner',
  templateUrl: './delete-owner.component.html',
  styleUrls: ['./delete-owner.component.scss'],
})
export class DeleteOwnerComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number; name: string },
    private petService: PetService,
    private ownerService: OwnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  deleteOwner(id: number) {
    this.petService.getPet(id).subscribe(
      (data) => {
        if (Object.entries(data).length === 0) {
          this.ownerService.deleteOwner(id).subscribe(
            (data2) => {
              this.dialog.closeAll();
              location.reload();
            },
            (err) => {
              console.warn('Hubo un error!');
              console.warn(err);
            }
          );
        } else {
          Swal.fire({
            title: 'No es posible realizar esta acción',
            text:
              'Este registro cuenta con mascotas ligadas a él, para continuar elimine primero las mascotas.',
            icon: 'error',
            confirmButtonText: 'Entiendo',
          });
        }
      },
      (err) => {
        console.warn('Hubo un error!');
        console.warn(err);
      }
    );
  }

  notDelete() {
    this.dialog.closeAll();
  }
}
