import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Geolocation} from '@capacitor/geolocation';


@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class MoodsPage implements OnInit {

  distance: string = "";
  mood: string = "";
  zipcode: string = "";
  userLatitude: string ="";
  userLongitude: string ="";
  useGeolocation : boolean = false;
  loadingCtrl: LoadingController = new LoadingController;

  icons: string[] = [];
  moods: string[] = [];
  items: Array<{ title: string; icon: string; }> = [];
  

  constructor(public nav: NavController, private router: Router) {
    
    this.distance = "20";
    this.mood = "seafood";
    this.zipcode = "90210";
    this.userLatitude = "";
    this.userLongitude = "";
    this.useGeolocation = false;
    this.moodFactory();
  }

  ngOnInit() {
    
  }

  moodFactory() {
    this.icons = ['trophy', 'cafe', 'rose', 'nutrition', 'pizza', 'car',
    'beer', 'glasses', 'ice-cream', 'ice-cream', 'nutrition', 'cash', 'car', 'boat',
    'egg', 'rose'];
    this.moods = ['Celebration', 'Tired', 'Fancy', 'Healthy', 'Hungover', 'In A Hurry',
    'Liquid Courage', 'Munchies', 'Sad', 'Lo-On-Sugar', 'Fruity', 'Broke', 'Lazy',
     'Fishy', 'Morning Delight', 'Organic'];
    this.items = [];
    
    for (let i = 0; i < this.moods.length; i++) {
      this.items.push({
        title: this.moods[i],
        icon: this.icons[i]
      });
    }
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  async fetchLocationWithCoordinates() {
    this.useGeolocation = true;

    const loading = await this.loadingCtrl.create({
      message: 'Fetching Your Location..',
      spinner: 'bubbles',
    });
    await loading.present();

    const position = await Geolocation.getCurrentPosition();
      console.log('location = ', location);
      this.userLatitude = position.coords.latitude.toString();
      this.userLongitude = position.coords.longitude.toString();
      console.log(this.userLongitude + " & " + this.userLatitude);

      this.checkAndCloseLoader();
     
      const params: NavigationExtras = {
      queryParams: {
        distance: this.distance, mood: this.mood, userLatitude: this.userLatitude, userLongitude: this.userLongitude, useGeolocation: this.useGeolocation
      }
    }
    
    this.router.navigate(['/locations'], params);
  }

  fetchLocationWithoutCoordinates() {
    this.useGeolocation = false;

    const params: NavigationExtras = {
      queryParams: {
        distance: this.distance, mood: this.mood, zipcode: this.zipcode, useGeolocation: this.useGeolocation
      }
    }
    this.router.navigate(['/locations'], params);
  }

  async checkAndCloseLoader() {
    // Use getTop function to find the loader and dismiss only if loader is present.
    const loader = await this.loadingCtrl.getTop();
    // if loader present then dismiss
     if(loader !== undefined) { 
       await this.loadingCtrl.dismiss();
     }
   }

  //Optional way to navigate with params
  /*navigateWithParams() {
    this.router.navigateByUrl(`/locations?filter=color&mydistance=${this.distance}&mood=seafood&zipcode=08087`);
  }*/

}
