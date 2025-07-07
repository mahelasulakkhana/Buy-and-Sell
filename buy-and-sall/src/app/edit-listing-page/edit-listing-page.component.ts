import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Listing } from '../types';
import { ListingDataFormComponent } from '../listing-data-form/listing-data-form.component';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-edit-listing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ListingDataFormComponent],
  templateUrl: './edit-listing-page.component.html',
  styleUrl: './edit-listing-page.component.css',
})
export class EditListingPageComponent implements OnInit {
  listing: Listing | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('No ID found in route.');
      return;
    }
    this.listingsService
      .getListingById(id)
      .subscribe((listing) => (this.listing = listing));
  }

  onSubmit({
    name,
    description,
    price,
  }: {
    name: string;
    description: string;
    price: number;
  }): void {
    if (!this.listing) {
      console.error('Listing is undefined.');
      return;
    }

    this.listingsService
      .updateListing(this.listing.id, name, description, price)
      .subscribe(() => {
        this.router.navigateByUrl('/my-listings');
      });
  }
}
