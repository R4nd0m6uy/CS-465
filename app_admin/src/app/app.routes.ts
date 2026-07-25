import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: TripListing },
  { path: 'login', component: Login },
  { path: 'add-trip', component: AddTrip, canActivate: [authGuard] },
  { path: 'edit-trip/:tripCode', component: EditTrip, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
