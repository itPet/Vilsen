import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'game-play', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'create-game', loadChildren: './create-game/create-game.module#CreateGamePageModule' },
  { path: 'score', loadChildren: './score/score.module#ScorePageModule' },
  { path: 'mission-report', loadChildren: './mission-report/mission-report.module#MissionReportPageModule' },
  { path: 'round-finished', loadChildren: './round-finished/round-finished.module#RoundFinishedPageModule' },
  // { path: 'missions', loadChildren: './missions/missions.module#MissionsPageModule' },
  // { path: 'place-details', loadChildren: './place-details/place-details.module#PlaceDetailsPageModule' }
  // { path: 'places', loadChildren: './places/places.module#PlacesPageModule' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
