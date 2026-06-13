import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, RouterLink, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message = '';
  debug = 'Component loaded.';

  constructor(
    private tripDataService: TripDataService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  async loadTrips(): Promise<void> {
    try {
      this.debug = 'Calling API...';
      this.changeDetector.detectChanges();

      const trips = await this.tripDataService.getTrips();

      console.log('Trips loaded:', trips);

      this.trips = trips;
      this.debug = `API returned ${this.trips.length} trips.`;
      this.message = '';

      this.changeDetector.detectChanges();
    } catch (err) {
      console.error('Trip API error:', err);
      this.debug = 'API call failed. Check browser console.';
      this.message = 'Unable to load trips from the API.';
      this.changeDetector.detectChanges();
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
      this.changeDetector.detectChanges();
    }
  }
}
