import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'places',
        children: [
          {
            path: '',
            loadChildren: '../places/places.module#PlacesPageModule'
          }
        ]
      },
      {
        path: 'missions',
        children: [
          {
            path: '',
            loadChildren: '../missions/missions.module#MissionsPageModule'
          }
        ]
      },
      {
        path: 'places',
        children: [
          {
            path: 'place-details/:name',
            loadChildren: '../place-details/place-details.module#PlaceDetailsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'game-play/tabs/places',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'game-play/tabs/places',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
