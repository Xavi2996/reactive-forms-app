import { Routes } from '@angular/router';
import { SwitchesPageComponent } from './switches-page/switches-page.component';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { DinamicPageComponent } from './dinamic-page/dinamic-page.component';

export const reactiverRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Dynamic',
        component: DinamicPageComponent,
      },
      {
        path: 'switches',
        title: 'switches',
        component: SwitchesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'basic',
      },
    ],
  },
];
