import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Owner } from '../models/owner';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  API = 'http://localhost:3000';

  constructor(private httClient: HttpClient) {}

  getOwner(id: number) {
    return this.httClient.get(`${this.API}/owner/:id`);
  }

  getearchWoner() {
    return this.httClient.get(`${this.API}/searchOwner`);
  }

  getOwners() {
    return this.httClient.get(`${this.API}/listAllOwners`);
  }

  createOwner(owner: any) {
    console.log(owner);
    return this.httClient.post(`${this.API}/createOwner`, owner);
  }

  updateOwner(owner: Owner) {
    return this.httClient.put(`${this.API}/updateOwner`, owner);
  }

  deleteOwner(id: number) {
    return this.httClient.delete(`${this.API}/deleteOwner/:id`);
  }
}
