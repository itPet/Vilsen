import { LocalDataService } from './../services/local-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place, PlacesService } from '../services/places.service';
import { ServerService } from '../services/server.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {

  place: Place;
  playerRole: string;
  roleSpelledOut: string;
  iAmHere: boolean;

  constructor(private activadedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private localData: LocalDataService,
    private server: ServerService,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    const placeName = this.activadedRoute.snapshot.paramMap.get('name'); // get place name from url
    this.place = this.placesService.getPlace(placeName); // get place
    this.playerRole = this.localData.getPlayerRole(); // get playerRole

    if (this.localData.getChosenPlace().name === this.place.name && this.playerRole !== 'lost') {
      this.iAmHere = true;
      if (this.playerRole === 'unique') {
        this.roleSpelledOut = this.place.uniqueRole;
      } else if (this.playerRole === 'general') {
        this.roleSpelledOut = this.place.generalRole;
      }
    }
  }

  navigate() {
    this.router.navigateByUrl('/game-play/tabs/places');
  }

  async guessedOnPlace(placeName: string) {
    const alert = await this.alertCtrl.create({
      message: 'Är du säker på att du vill gissa på ' + placeName + '? Du får bara ett försök.',
      buttons: [
        {
          text: 'Avbryt',
          role: 'cancel'
        },
        {
          text: 'Jag är säker',
          handler: () => {
            this.server.setLostGuessed(true);
            this.localData.setPlaceGuess(placeName);
          }
        }
      ]
    });

    await alert.present();
  }

}
