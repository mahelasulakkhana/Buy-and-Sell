import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from '../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-data-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listing-data-form.component.html',
  styleUrl: './listing-data-form.component.css',
})
export class ListingDataFormComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() currentName = '';
  @Input() currentDescription = '';
  @Input() currentPrice = 0;

  name: string = '';
  description: string = '';
  price: Number = 0;

  @Output() onSubmit = new EventEmitter<Listing>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice;
  }

  onButtonClicked(): void {
    this.onSubmit.emit({
      id: null as any,
      name: this.name,
      description: this.description,
      price: Number(this.price),
      views: 0,
    });
  }
}
