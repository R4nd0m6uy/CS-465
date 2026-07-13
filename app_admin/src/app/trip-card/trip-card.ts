import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input() trip!: Trip;
  @Output() deleteRequested = new EventEmitter<string>();

  constructor(public authService: AuthenticationService) {}

  requestDelete(): void {
    this.deleteRequested.emit(this.trip.code);
  }
}
