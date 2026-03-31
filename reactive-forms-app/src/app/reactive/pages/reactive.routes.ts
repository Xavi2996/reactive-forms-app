import { Routes } from "@angular/router";
import { BasicPageComponent } from "../../country/pages/basic-page/basic-page.component";
import { DinamicPageComponent } from "../../country/pages/dinamic-page/dinamic-page.component";
import { SwitchesPageComponent } from "../../country/pages/switches-page/switches-page.component";

export const reactiverRoutes: Routes = [
  {
    path: '',
    children:[
      {
        path:'basic',
        title:'Básicos',
        component: BasicPageComponent
      },
      {
        path:'dynamic',
        title:'Básicos',
        component: DinamicPageComponent
      },
      {
        path:'switches',
        title:'switches',
        component: SwitchesPageComponent
      },
      {
        path:'**',
        redirectTo: 'basic'
      }
    ]
  }
]
