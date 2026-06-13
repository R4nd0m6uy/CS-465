import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, RouterLink, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message = '';
  debug = 'Component loaded.';

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  async loadTrips(): Promise<void> {
    try {
      this.debug = 'Calling API...';

      const trips = await this.tripDataService.getTrips();

      console.log('Trips loaded:', trips);

      this.trips = trips;
      this.debug = `API returned ${this.trips.length} trips.`;
      this.message = '';
    } catch (err) {
      console.error('Trip API error:', err);
      this.debug = 'API call failed. Check browser console.';
      this.message = 'Unable to load trips from the API.';
    }
  }

  async deleteTrip(tripCode: string): Promise<void> {
    if (!confirm(`Delete trip ${tripCode}?`)) {
      return;
    }

    try {
      await this.tripDataService.deleteTrip(tripCode);
      await this.loadTrips();
    } catch (err) {
      console.error(err);
      this.message = `Unable to delete trip ${tripCode}.`;
    }
  }
}
