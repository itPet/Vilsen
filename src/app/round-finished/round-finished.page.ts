import { Component, OnInit } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-round-finished',
  templateUrl: './round-finished.page.html',
  styleUrls: ['./round-finished.page.scss'],
})
export class RoundFinishedPage implements OnInit {

  titleMsg: string;
  contentMsg: string;

  constructor(private localData: LocalDataService,
    private router: Router,
    private server: ServerService) { }

  ngOnInit() {
    this.resetServerData();
    this.addPoints();

    if (this.localData.getLostGuessed()) {
      if (this.localData.getPlayerRole() === 'lost') {
        this.titleMsg = 'du har hittat en plats!';
        this.contentMsg = 'Berätta för de andra att du var vilsen men nu har hittat en plats och ' +
        'vilken plats det är du har hittat.';
      } else {
        this.titleMsg = 'den vilsne har hittat en plats!';
        this.contentMsg = 'Lyssna medan den vilsne talar om vilken plats den har kommit fram till.';
      }
    } else if (this.localData.getTimeRanOut()) {
      this.titleMsg = 'tiden tog slut!';
      this.contentMsg = 'Du kan berätta för de andra vilken roll du hade.';
    } else if (this.localData.getLostPlayerFound()) {
      this.titleMsg = 'majoriteten lyckades hitta den vilsne!';
      this.contentMsg = 'Du kan berätta för de andra vilken roll du hade.';
    }
  }

  resetServerData() {
    this.server.setCorrectLostGuess(null);
    this.server.setCorrectUniqueGuess(null);
    this.server.setPlayerReadyStatus(false);
    this.server.setPlayerRole(null);
    this.server.setCorrectPlaceGuess(null);
    this.server.setChosenPlaceWithNames(this.localData.getPlayerNames(), null);
  }

  addPoints() {
    let points = 0;
    if (this.localData.getPlayerRole() !== 'lost') {
      if (this.localData.getLostGuess() === this.localData.getLostPlayer()) {
        points += 3;
        console.log('Found lost: 3p');
      }
    }
    if (this.localData.getPlayerRole() === 'general') {
      if (this.localData.getUniqueGuess() === this.localData.getUniquePlayer()) {
        points += 1;
        console.log('Found unique 1p');
      }
    }
    if (this.localData.getPlayerRole() === 'unique') {
      if (this.localData.getCorrectUniqueGuesses() > 0) {
        points += 1;
        console.log('I got found as unique: 1p');
      }
    }
    if (this.localData.getPlayerRole() === 'lost') {
      if (this.localData.getPlaceGuess() === this.localData.getChosenPlace().name) {
        points += 3;
        console.log('Found place: 3p');
        if (!this.localData.getLostPlayerFound()) {
          points += 1;
          console.log('Did not get found by majority: 1p');
        }
      }
    }

    this.localData.addPoints(points);
    this.server.setPlayerScore(this.localData.getPoints());
  }

  navigate() {
    this.router.navigateByUrl('/mission-report');
  }

}
