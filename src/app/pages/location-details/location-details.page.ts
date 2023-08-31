import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LocationService, LocationDetails } from '../../services/location.service';
import { SwiperComponent } from './swiper/swiper.component';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.page.html',
  styleUrls: ['./location-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SwiperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocationDetailsPage implements OnInit {

  swiperOptions = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    //autoplay: true
  }

  slides: any[] = [];
  location: any;
  items: any;

  constructor( private route: ActivatedRoute, private locationService: LocationService)
  { 
    
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.locationService.getLocationById(id).subscribe((res) => {
      console.log(res);
      this.location = res;

      res.photos.forEach(item => {
        this.slides?.push({swiper: item})
      });

      console.log(this.slides);
    });
  }
  
}
