import { Routes } from '@angular/router';
import { NotfoundComponent } from './pages/main-layout/notfound/notfound.component';
import { HomeComponent } from './pages/main-layout/home/home.component';
import { AboutComponent } from './pages/main-layout/about/about.component';
import { ContactUsComponent } from './pages/main-layout/contact-us/contact-us.component';
import { DepressionComponent } from './pages/main-layout/depression/depression.component';
import { AnixityComponent } from './pages/main-layout/anixity/anixity.component';
import { TypePersonalComponent } from './pages/main-layout/type-personal/type-personal.component';
import { TestsComponent } from './pages/main-layout/tests/tests.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

import { SignInComponent } from './auth/pages/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: SignInComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        title: 'Contact Us',
      },
      {
        path: 'depression',
        component: DepressionComponent,
        title: 'Depression',
      },
      { path: 'about', component: AboutComponent, title: 'About' },
      { path: 'anixity', component: AnixityComponent, title: 'Anixity' },
      {
        path: 'type-personal',
        component: TypePersonalComponent,
        title: 'Type Personal',
      },
      { path: 'tests', component: TestsComponent, title: 'Tests' },
    ],
  },
  { path: '**', component: NotfoundComponent },
];
