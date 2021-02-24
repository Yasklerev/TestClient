import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOwnerComponent } from './new-owner/new-owner.component';
import { ListOwnerComponent } from './list-owner/list-owner.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ListPetComponent } from './list-pet/list-pet.component';
import { PetsOwnerComponent } from './list-owner/pets-owner/pets-owner.component';
import { DeletePetComponent } from './list-owner/pets-owner/delete-pet/delete-pet.component';
import { AddPetComponent } from './list-owner/add-pet/add-pet.component';
import { AppRoutingModule } from '../app-routing.module';
import { DeleteOwnerComponent } from './list-owner/delete-owner/delete-owner.component';

@NgModule({
  declarations: [
    NewOwnerComponent,
    ListOwnerComponent,
    ListPetComponent,
    PetsOwnerComponent,
    DeletePetComponent,
    AddPetComponent,
    DeleteOwnerComponent,
  ],
  imports: [CommonModule, MaterialModule, HttpClientModule, AppRoutingModule],
  exports: [
    NewOwnerComponent,
    ListOwnerComponent,
    ListPetComponent,
    PetsOwnerComponent,
    AddPetComponent,
    DeleteOwnerComponent,
  ],
})
export class PagesModule {}
