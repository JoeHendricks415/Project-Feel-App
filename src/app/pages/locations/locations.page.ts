import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule, LoadingController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LocationsPage implements OnInit {
  locations: any[];
  currentPage = 1;
  
  distance: string = "";
  mood: string = "";
  zipcode: string = "";

  userLatitude: string = "";
  userLongitude: string = "";

  useGeolocation: boolean = false;


  constructor(private locationService: LocationService,
    private loadingCtrl: LoadingController,
    public router: Router,
    private route: ActivatedRoute) {
    this.locations = [];

    this.distance = this.route.snapshot.queryParamMap.get('distance')!;
    this.mood = this.route.snapshot.queryParamMap.get('mood')!;
    this.zipcode = this.route.snapshot.queryParamMap.get('zipcode')!;
    this.userLatitude = this.route.snapshot.queryParamMap.get('userLatitude')!;
    this.userLongitude = this.route.snapshot.queryParamMap.get('userLongitude')!;

    this.useGeolocation = JSON.parse(this.route.snapshot.queryParamMap.get('useGeolocation')!);
  }

  ngOnInit() {
    this.loadLocations();
  }

  async loadLocations(event?: InfiniteScrollCustomEvent) {
    //Initialize loading
    const loading = await this.loadingCtrl.create({
      message: 'Feeding The Hunger..',
      spinner: 'bubbles',
    });
    await loading.present();

    //Check if using geolocation
    if(this.useGeolocation === false){
      this.locationService.getLocationsWithoutCoordinates(this.currentPage, this.distance, this.mood, this.zipcode)
        .subscribe(res => {
          loading.dismiss();
          this.locations.push(...res.businesses);
          console.log(this.locations);
          event?.target.complete();
      });
    } else {
      this.locationService.getLocationsWithCoordinates(this.currentPage, this.distance, this.mood, this.userLatitude, this.userLongitude)
        .subscribe(res => {
          loading.dismiss();
          this.locations.push(...res.businesses);
          console.log(this.locations);
          event?.target.complete();
      });
    }
  }

  //Code to sort by rating - works
  //this.locations = res.businesses.sort((b, a) => a.rating - b.rating);
  //console.log(this.locations);


  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadLocations(event);
  }
}