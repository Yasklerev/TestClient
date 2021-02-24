import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

// Angular Material
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent],
  imports: [
    CommonModule,

    // Angular Material
    MaterialModule,
    AppRoutingModule,
  ],
  exports: [HeaderComponent, FooterComponent, HomeComponent],
})
export class ComponentsModule {}
