import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../types';
import { fakeListings } from '../fake-data';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListingsService } from '../listings.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent implements OnInit {
  email: string = '';
  message: string = '';
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

    this.listingsService.getListingById(id).subscribe((listing) => {
      this.listing = listing;
      this.message = `Hi I'm interrested in your ${this.listing?.name.toLocaleLowerCase()} !`;
    });
  }

  sendMessage(): void {
    alert('Your message has been sent!');
    this.router.navigateByUrl('/listings');
  }
}
