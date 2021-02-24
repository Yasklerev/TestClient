import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  API = 'http://localhost:3000';

  constructor(private httClient: HttpClient) {}

  getPet(id: number) {
    return this.httClient.get(`${this.API}/listOnePet/${id}`);
  }

  getSearchPet() {
    return this.httClient.get(`${this.API}/searchPetr`);
  }

  getPets() {
    return this.httClient.get(`${this.API}/listAllPets`);
  }

  createPet(pet: any) {
    console.log(pet);
    return this.httClient.post(`${this.API}/createPet`, pet);
  }

  updatePet(pet) {
    return this.httClient.put(`${this.API}/updatePet`, pet);
  }

  deletePet(id: number) {
    console.log(id);
    return this.httClient.delete(`${this.API}/deletePet/${id}`);
  }
}
