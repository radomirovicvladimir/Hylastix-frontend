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

  items: Item[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1; // NgbPagination is 1-based
  pageSize: number = 10;

  sortBy: string = 'timeStored';
  sortDirection: string = 'desc';

  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    // Backend is 0-based, so subtract 1
    this.itemService.getItemsList(this.currentPage - 1, this.pageSize, this.sortBy, this.sortDirection)
      .subscribe(data => {
        this.items = data.content;
        this.totalItems = data.totalElements;
        this.totalPages = data.totalPages;
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getItems();
  }

  sort(field: string) {
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
    this.getItems();
  }

  itemDetails(id: number) {
    this.router.navigate(['item-details', id]);
  }

  updateItem(id: number) {
    this.router.navigate(['update-item', id]);
  }

  deleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe(() => this.getItems());
  }

  getSortIcon(field: string): string {
    if (this.sortBy === field) {
      return this.sortDirection === 'asc' ? '▲' : '▼';
    }
    return '';
  }
}
