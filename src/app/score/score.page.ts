import { LocalDataService } from './../services/local-data.service';
import { PlacesService, Place } from './../services/places.service';
import { Router } from '@angular/router';
import { ServerService, Player } from './../services/server.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage {

  players: Player[];
  lostPlayer: string;

  subscription: Subscription;

  constructor(private server: ServerService,
    private router: Router,
    private localData: LocalDataService) { }

  ionViewWillEnter() {
    let roleSaved = false;
    let roleSavedToServer = false;
    let placeSaved = false;
    let placeSavedToServer = false;
    let lostPlayerSaved = false;
    let uniquePlayerSaved = false;
    let playerNamesSaved = false;
    let readyToNavigate = false;
    this.subscription = this.server.getPlayers().subscribe(res => {
      let allReady = true;
      this.players = res;
      this.players.forEach(player => {
        if (!player.ready) {
          allReady = false;
        }

        // Save Role and Place
        if (player.name === this.localData.getPlayerName()) {
          if (player.role !== null && !roleSaved) {
            roleSaved = true;
            this.localData.setPlayerRole(player.role);
          }
          if (player.chosenPlace !== null && !placeSaved) {
            placeSaved = true;
            this.localData.setChosenPlace(player.chosenPlace);
          }
        }

        // Save lost- and unique-Player
        if (player.role === 'lost' && !lostPlayerSaved) {
          lostPlayerSaved = true;
          this.localData.setLostPlayer(player.name);
        } else if (player.role === 'unique' && !uniquePlayerSaved) {
          uniquePlayerSaved = true;
          this.localData.setUniquePlayer(player.name);
        }
      });

      // Save playerNames
      if (allReady) {
        if (!playerNamesSaved) {
          playerNamesSaved = true;
          const playerNames: string[] = [];
          this.players.forEach(p => {
            playerNames.push(p.name);
          });
          this.localData.setPlayerNames(playerNames);
        }

        // Randomize Place and Role
        if (this.localData.isHost()) {
          if (!placeSavedToServer) {
            placeSavedToServer = true;
            this.randomizePlace();
          }
          if (!roleSavedToServer) {
            roleSavedToServer = true;
            this.server.setGameStartedStatus(true);
            this.randomizeRoles();
          }
        }
      }

      // set readyToNavigate
      if (allReady && roleSaved && placeSaved && playerNamesSaved && lostPlayerSaved && uniquePlayerSaved && !readyToNavigate) {
        readyToNavigate = true;
      }

      // Navigate
      if (readyToNavigate) {
        readyToNavigate = false;
        if (this.localData.getPlayerRole() === 'lost') {
          this.router.navigateByUrl('/game-play/tabs/places');
        } else {
          this.router.navigateByUrl('/game-play/tabs/places/place-details/' + this.localData.getChosenPlace().name);
        }
      }
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  readyToPlay() {
    this.server.setPlayerReadyStatus(true);
  }

  randomizeRoles() {
    const playerNums: number[] = [];
    for (let index = 0; index < this.players.length; index++) {
      playerNums.push(index);
    }
    const uniqueNum = playerNums[(Math.floor(Math.random() * playerNums.length))];
    playerNums.splice(uniqueNum, 1);
    const lostNum = playerNums[(Math.floor(Math.random() * playerNums.length))];
    this.server.setPlayerRoles(this.players, this.players[uniqueNum].name, this.players[lostNum].name);
  }

  randomizePlace() {
    const places = this.localData.getPlaces();
    const chosenPlace = places[(Math.floor(Math.random() * places.length))];
    this.server.setChosenPlaceWithNames(this.localData.getPlayerNames(), chosenPlace);
  }

}
