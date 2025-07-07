import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngFor, *ngIf, etc.
import { Listing } from '../types';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-listings-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css'],
})
export class ListingsPageComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.listingsService
      .getListings()
      .subscribe((listings) => (this.listings = listings));
  }
}
