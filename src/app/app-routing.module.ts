import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { UpdateItemComponent } from './update-item/update-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const routes: Routes = [
  {path: 'items', component: ItemListComponent},
  {path: 'create-item', component: CreateItemComponent},
  {path: '', redirectTo: 'items', pathMatch: 'full'},
  {path: 'update-item/:id', component: UpdateItemComponent},
  {path: 'item-details/:id', component: ItemDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})
export class AppRoutingModule { }
