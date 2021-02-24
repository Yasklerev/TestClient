import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddPetComponent } from './pages/list-owner/add-pet/add-pet.component';
import { ListOwnerComponent } from './pages/list-owner/list-owner.component';
import { ListPetComponent } from './pages/list-pet/list-pet.component';
import { NewOwnerComponent } from './pages/new-owner/new-owner.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newOwner', component: NewOwnerComponent },
  { path: 'addPet', component: AddPetComponent },
  { path: 'listOwner', component: ListOwnerComponent },
  { path: 'listPet', component: ListPetComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
