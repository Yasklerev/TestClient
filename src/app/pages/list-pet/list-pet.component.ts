import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-list-pet',
  templateUrl: './list-pet.component.html',
  styleUrls: ['./list-pet.component.scss'],
})
export class ListPetComponent implements OnInit {
  pets: any;

  constructor(private petService: PetService) {}

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
}
