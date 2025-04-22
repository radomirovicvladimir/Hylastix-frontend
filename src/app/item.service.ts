import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseURL = "http://localhost:8080/api/v1/items";

  constructor(private httpClient: HttpClient) { }
  
  getItemsList(page: number = 0, size: number = 10, sortBy: string = 'timeStored', sortDirection: string = 'desc'): Observable<any> {
    const url = `${this.baseURL}?page=${page}&size=${size}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
    return this.httpClient.get<any>(url);
  }  

  createItem(item: Item): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, item);
  }

  getItemById(id: number): Observable<Item>{
    return this.httpClient.get<Item>(`${this.baseURL}/${id}`);
  }

  updateItem(id: number, item: Item): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, item);
  }

  deleteItem(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
