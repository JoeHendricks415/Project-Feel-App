import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageSliderService {

  slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 5,
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000
    },
}

  constructor() { }
}
