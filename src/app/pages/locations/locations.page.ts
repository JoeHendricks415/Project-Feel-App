import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule, LoadingController } from '@ionic/angular';
import { ApiResults, LocationService } from 'src/app/services/location.service';
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


  constructor(private locationService: LocationService,
    private loadingCtrl: LoadingController,
    public router: Router,
    private route: ActivatedRoute) {
    this.locations = [];

      this.distance = this.route.snapshot.queryParamMap.get('distance')!;
      this.mood = this.route.snapshot.queryParamMap.get('mood')!;
      this.zipcode = this.route.snapshot.queryParamMap.get('zipcode')!;

  }

  ngOnInit() {
    //console.log(`distance: ${this.distance} - mood: ${this.mood} - zipcode: ${this.zipcode}`);
    this.loadLocations();
  }

  async loadLocations(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Feeding The Hunger..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.locationService.getLocations(this.currentPage, this.distance, this.mood, this.zipcode)
        .subscribe(res => {
          loading.dismiss();
          this.locations.push(...res.businesses);
          console.log(this.locations);

          //Code to sort by rating - works
          //this.locations = res.businesses.sort((b, a) => a.rating - b.rating);
          //console.log(this.locations);

          event?.target.complete();
      });
  }

  sortLocationsByRatingHighest(locations: ApiResults) {
    //this.locations = locations.businesses.sort(function (a, b) {
    //  return a.rating - b.rating;
    //});
    //console.log(this.locations);
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadLocations(event);
  }
}
