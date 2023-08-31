import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs';

//Locations Results
export interface ApiResults {
  businesses: Business[]
  total: number
  region: Region
  //page: number;
  //businesses: any[];
  //total: number;
}
export interface Business {
  id: string
  alias: string
  name: string
  image_url: string
  is_closed: boolean
  url: string
  review_count: number
  categories: Category[]
  rating: number
  coordinates: Coordinates
  transactions: string[]
  price?: string
  location: Location
  phone: string
  display_phone: string
  distance: number
}

export interface Category {
  alias: string
  title: string
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Location {
  address1: string
  address2: string
  address3: string
  city: string
  zip_code: string
  country: string
  state: string
  display_address: string[]
}

export interface Region {
  center: Center
}

export interface Center {
  longitude: number
  latitude: number
}

//Location Details Api Results
export interface LocationDetails {
  id: string
  alias: string
  name: string
  image_url: string
  is_claimed: boolean
  is_closed: boolean
  url: string
  phone: string
  display_phone: string
  review_count: number
  categories: Category[]
  rating: number
  location: Location
  coordinates: Coordinates
  photos: string[]
  price: string
  hours: Hour[]
  transactions: string[]
}

export interface Category {
  alias: string
  title: string
}

export interface Location {
  address1: string
  address2: string
  address3: string
  city: string
  zip_code: string
  country: string
  state: string
  display_address: string[]
  cross_streets: string
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Hour {
  open: Open[]
  hours_type: string
  is_open_now: boolean
}

export interface Open {
  is_overnight: boolean
  start: string
  end: string
  day: number
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocationsWithoutCoordinates(page = 1, distance: string, mood: string, zipcode: string): Observable<ApiResults> {
    return this.http.get<any>(`${environment.baseUrl}/api/yelp/${distance}/${mood}/${zipcode}`);
  }

  getLocationById(id: string): Observable<LocationDetails>{
    return this.http.get<any>(
      `${environment.baseUrl}/api/yelp/${id}`
    );
  }

  getLocationsWithCoordinates(page = 1, distance: string, mood: string, latitude: string, longitude: string): Observable<ApiResults> {
    return this.http.get<any>(`${environment.baseUrl}/api/yelp/${distance}/${mood}/${latitude}/${longitude}`);
  }
}
