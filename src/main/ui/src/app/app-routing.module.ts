import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantsComponent } from './tenants/tenants.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { ApplianceComponent } from './appliance/appliance.component';
import { MiscComponent } from './misc/misc.component';


const routes: Routes = [
  {
    path: 'tenants',
    component: TenantsComponent
  },
  {
    path: 'utilities',
    component: UtilitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [TenantsComponent, UtilitiesComponent, FurnitureComponent, ApplianceComponent, MiscComponent];