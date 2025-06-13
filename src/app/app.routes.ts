import { Routes } from '@angular/router';
import { NotfoundComponent } from './pages/main-layout/notfound/notfound.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { loggedGuard } from './core/guard/logged.guard';
import { authGuard } from './core/guard/auth.guard';
import { AudioRecorderComponent } from './pages/main-layout/audio-recorder/audio-recorder.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';



export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

          {
            path: 'home',
            loadComponent: () =>
              import('./pages/main-layout/home/home.component').then((m) => m.HomeComponent),
            title: 'الصفحه الرئيسيه',
          },

          {
            path: 'contact-us',
            loadComponent: () =>
              import('./pages/main-layout/contact-us/contact-us.component').then((m) => m.ContactUsComponent),
            title: 'اتصل بينا',
          },
          {
            path: 'depression/:id',
            loadComponent: () =>
              import('./pages/main-layout/depression/depression.component').then((m) => m.DepressionComponent),
            title: 'الاكتيئاب',
            canActivate: [authGuard]
          },
          {
            path: 'about',
            loadComponent: () =>
              import('./pages/main-layout/about/about.component').then((m) => m.AboutComponent),
            title: 'نبذه عنا',
          },
          {
            path: 'anixity/:id',
            canActivate: [authGuard],
            loadComponent: () =>
              import('./pages/main-layout/anixity/anixity.component').then((m) => m.AnixityComponent),
            title: 'القلق ',
          },
          {
            path: 'communication-skills/:id',
            loadComponent: () =>
              import('./pages/main-layout/communication-skills/communication-skills.component').then((m) => m.CommunicationSkillsComponent),
            title: 'مهارات التواصل',
            canActivate: [authGuard]
          },
          {
            path: 'type-personal/:id',
            loadComponent: () =>
              import('./pages/main-layout/type-personal/type-personal.component').then((m) => m.TypePersonalComponent),
            title: 'نوع الشخصيه',
            canActivate: [authGuard],
          },
          {
            path: 'tests',
            loadComponent: () =>
              import('./pages/main-layout/tests/tests.component').then((m) => m.TestsComponent),
            title: 'الاختبارات',
          },



        ],
      },
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./auth/pages/sign-in/sign-in.component').then((m) => m.SignInComponent),
            title: 'Login',
            canActivate: [loggedGuard],
          },
          {
            path: 'setting',
            loadComponent: () =>
              import('./pages/main-layout/setting/setting.component').then((m) => m.SettingComponent),
            title: 'اعدادات المستخدام',
            canActivate: [authGuard]

          },
          {
            path: 'profiling',
            loadComponent: () =>
              import('./pages/main-layout/profiling-personal/profiling-personal.component').then((m) => m.ProfilingPersonalComponent),
            title: 'الصفحه الشخصيه',
            canActivate: [authGuard]

          },
          {
            path:'audio-recorder',
            component:AudioRecorderComponent
          },
          {
            path: 'rest-password',
            component:ResetPasswordComponent,
            title: 'Reset Password',
          },

        ],
      },
      { path: '**', component: NotfoundComponent },





];
