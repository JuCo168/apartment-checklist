import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantComponent } from './tenants/tenants.component';
import { UtilityComponent } from './utilities/utility.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { ApplianceComponent } from './appliance/appliance.component';
import { MiscComponent } from './misc/misc.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'tenants',
    component: TenantComponent
  },
  {
    path: 'utilities',
    component: UtilityComponent
  },
  {
    path: 'appliances',
    component: ApplianceComponent
  },
  {
    path: 'furniture',
    component: FurnitureComponent
  },
  {
    path: 'misc',
    component: MiscComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, TenantComponent, UtilityComponent, FurnitureComponent, ApplianceComponent, MiscComponent];