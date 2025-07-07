import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingsService } from '../listings.service';
import { fakeMyListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-my-listings-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-listings-page.component.html',
  styleUrl: './my-listings-page.component.css',
})
export class MyListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    const userId = '1';
    this.listingsService.getListingsForUser(userId).subscribe((listings) => {
      this.listings = listings;
    });
  }

  onDeleteClicked(listingId: string): void {
    this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listings = this.listings.filter(
        (listing) => listing.id !== listingId
      );
    });
  }
}
