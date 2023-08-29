import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.page.html',
  styleUrls: ['./location-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LocationDetailsPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService)
  { }

  location: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.locationService.getLocationDetails(id).subscribe((res) => {
      console.log(res);
      this.location = res;
    });
  }

}
