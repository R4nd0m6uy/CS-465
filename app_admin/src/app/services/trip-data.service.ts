import { Injectable } from '@angular/core';

import { Trip } from '../models/trip';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private authService: AuthenticationService) {}

  private authHeaders(): HeadersInit {
    const token = this.authService.getToken();

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  }

  async getTrips(): Promise<Trip[]> {
    const response = await fetch(`${this.apiBaseUrl}/trips?_=${Date.now()}`);

    if (!response.ok) {
      throw new Error(`GET trips failed: ${response.status}`);
    }

    return response.json();
  }

  async getTrip(tripCode: string): Promise<Trip> {
    const response = await fetch(`${this.apiBaseUrl}/trips/${tripCode}?_=${Date.now()}`);

    if (!response.ok) {
      throw new Error(`GET trip failed: ${response.status}`);
    }

    return response.json();
  }

  async addTrip(trip: Trip): Promise<Trip> {
    const response = await fetch(`${this.apiBaseUrl}/trips`, {
      method: 'POST',
      headers: this.authHeaders(),
      body: JSON.stringify(trip)
    });

    if (!response.ok) {
      throw new Error(`POST trip failed: ${response.status}`);
    }

    return response.json();
  }

  async updateTrip(trip: Trip): Promise<Trip> {
    const response = await fetch(`${this.apiBaseUrl}/trips/${trip.code}`, {
      method: 'PUT',
      headers: this.authHeaders(),
      body: JSON.stringify(trip)
    });

    if (!response.ok) {
      throw new Error(`PUT trip failed: ${response.status}`);
    }

    return response.json();
  }

  async deleteTrip(tripCode: string): Promise<void> {
    const response = await fetch(`${this.apiBaseUrl}/trips/${tripCode}`, {
      method: 'DELETE',
      headers: this.authHeaders()
    });

    if (!response.ok) {
      throw new Error(`DELETE trip failed: ${response.status}`);
    }
  }
}
