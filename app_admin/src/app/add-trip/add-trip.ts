import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTrip {
  message = '';

  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: 'reef1.jpg',
    description: ''
  };

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    try {
      await this.tripDataService.addTrip(this.trip);
      await this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
      this.message = 'Unable to add trip.';
    }
  }
}
