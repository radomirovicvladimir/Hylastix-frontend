import { Component, OnInit } from '@angular/core';
import { Item } from '../item'
import { ItemService } from '../item.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[];

  constructor(private itemService: ItemService,
    private router: Router) { }

  ngOnInit(): void {
    this.getItems();
  }

  private getItems(){
    this.itemService.getItemsList().subscribe(data => {
      this.items = data;
    });
  }

  itemDetails(id: number){
    this.router.navigate(['item-details', id]);
  }

  updateItem(id: number){
    this.router.navigate(['update-item', id]);
  }

  deleteItem(id: number){
    this.itemService.deleteItem(id).subscribe( data => {
      console.log(data);
      this.getItems();
    })
  }
}
