import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { fakeListings } from '../fake-data';
import { Listing } from '../types';
import { ListingsService } from '../listings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-detail-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listing-detail-page.component.html',
  styleUrls: ['./listing-detail-page.component.css'],
})
export class ListingDetailPageComponent implements OnInit {
  listing: Listing | undefined;
  isLoading: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    debugger;
    if (!id) {
      console.error('No ID found in route.');
      return;
    }

    // this.listingsService.getListingById(id).subscribe((listing) => {
    //   this.listing = listing;
    //   this.isLoading = false;
    // });

    this.listingsService.getListingById(id).subscribe({
      next: (listing) => {
        this.listing = listing;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching listing:', err);
        this.isLoading = false;
      },
    });

    this.listingsService
      .addViewToListing(id)
      .subscribe(() => console.log('View updated!'));
  }
}
