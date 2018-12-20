import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServerService, Player} from '../services/server.service';
import { LocalDataService } from '../services/local-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  minutes = 8;
  seconds = 0;
  zeroS: number = null;
  zeroM: number = null;
  subscription: Subscription;
  allP: number;
  players: Player[];

  constructor(public alertCtrl: AlertController,
    private router: Router,
    private server: ServerService,
    private localData: LocalDataService) { }


  ionViewWillEnter() {
    this.timer();

    this.allP = this.localData.getPlayerNames().length - 1;

    this.subscription = this.server.getPlayers().subscribe(res => {
      let rightGuesses = 0;
      let allHaveGuessed = true;
      this.players = res;

      res.forEach(player => {
        if (player.role !== 'lost' && player.correctLostGuess === null) {
          allHaveGuessed = false;
        }
        if (player.role === 'general' && player.correctUniqueGuess === null) {
          allHaveGuessed = false;
        }
        if (player.correctLostGuess) {
          rightGuesses ++;
        }
        if (player.role === 'lost' && player.correctPlaceGuess !== null) {
          this.localData.setLostGuessed(true);
          let correctGuesses = 0;
          let correctLost = 0;
          res.forEach(pl => {
            if (pl.correctUniqueGuess) {
              correctGuesses ++;
            }
            if (pl.correctLostGuess) {
              correctLost ++;
            }
          });
          this.localData.setCorrectLostGuesses(correctLost);
          this.localData.setCorrectUniqueGuesses(correctGuesses);
          this.router.navigateByUrl('/round-finished');
        }
      });

      if (allHaveGuessed && (rightGuesses / this.allP) > 0.5) {
        this.localData.setLostPlayerFound(true);
        let correctGuesses = 0;
        let correctLost = 0;
        res.forEach(pl => {
          if (pl.correctUniqueGuess) {
            correctGuesses ++;
          }
          if (pl.correctLostGuess) {
            correctLost ++;
          }
        });
        this.localData.setCorrectLostGuesses(correctLost);
        this.localData.setCorrectUniqueGuesses(correctGuesses);
        this.router.navigateByUrl('/round-finished');
      }
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  timer() {
    const intervalId = setInterval(() => {
      this.seconds -= 1;
      if (this.seconds <= 0 && this.minutes > 0) {
        this.minutes -= 1;
        this.seconds = 59;
      }
      if (this.seconds < 10) {
        this.zeroS = 0;
      } else {
        this.zeroS = null;
      }
      if (this.minutes < 10) {
        this.zeroM = 0;
      } else {
        this.zeroM = null;
      }
      if (this.minutes <= 0 && this.seconds <= 0) {
        clearInterval(intervalId);
        this.localData.setTimeRanOut(true);
        this.storeCorrectUniqueAndLostGuesses();
        this.router.navigateByUrl('/round-finished');
      }
    }, 1000);
  }

  storeCorrectUniqueAndLostGuesses() {
    let correctGuesses = 0;
    let correctLost = 0;
    this.players.forEach(p => {
      if (p.correctUniqueGuess) {
        correctGuesses ++;
      }
      if (p.correctLostGuess) {
        correctLost ++;
      }
    });

    this.localData.setCorrectLostGuesses(correctLost);
    this.localData.setCorrectUniqueGuesses(correctGuesses);
  }

}
