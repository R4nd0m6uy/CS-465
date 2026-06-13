import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  message = '';

  trip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  async ngOnInit(): Promise<void> {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');

    if (!tripCode) {
      this.message = 'Missing trip code.';
      return;
    }

    try {
      const trip = await this.tripDataService.getTrip(tripCode);
      this.trip = {
        ...trip,
        start: trip.start ? trip.start.substring(0, 10) : ''
      };
    } catch (err) {
      console.error(err);
      this.message = `Unable to load trip ${tripCode}.`;
    }
  }

  async onSubmit(): Promise<void> {
    try {
      await this.tripDataService.updateTrip(this.trip);
      await this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
      this.message = 'Unable to update trip.';
    }
  }
}
