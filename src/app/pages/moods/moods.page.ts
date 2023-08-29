import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MoodsPage implements OnInit {

  distance: string = "";
  mood: string = "";
  zipcode: string = "";


  constructor(public nav: NavController, private router: Router) {
    this.distance = "20";
    this.mood = "seafood";
    this.zipcode = "08087";
  }

  ngOnInit() {
  }

  navigateWithParams() {
    this.router.navigateByUrl(`/locations?filter=color&mydistance=${this.distance}&mood=seafood&zipcode=08087`);
  }

  navigateWithObject() {
    const params: NavigationExtras = {
      queryParams: {
        distance: this.distance, mood: this.mood, zipcode: this.zipcode
      }
    }
    this.router.navigate(['/locations'], params);
  }

  navigateWithState() {

  }

}
