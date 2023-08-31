import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent {
  constructor(private route: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.route.navigateByUrl('moods');
  }
  

}
