import { Injectable } from '@angular/core';
import { Listing } from './types';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  constructor(private http: HttpClient) {
    console.log('HttpClient injected successfully:', !!http);
  }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions
    );
  }

  getListingsForUser(userId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`/api/users/${userId}/listings`);
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete(`/api/listings/${id}`);
  }

  createListing(
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    debugger;
    const newListing = {
      name,
      description,
      price,
    };
    return this.http.post<Listing>('/api/listings', newListing, httpOptions);
  }

  updateListing(
    id: string,
    name: string,
    description: string,
    price: number
  ): Observable<Listing> {
    const updatedListing = {
      name,
      description,
      price,
    };
    return this.http.post<Listing>(
      `/api/listings/${id}`,
      updatedListing,
      httpOptions
    );
  }
}
