import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteNonprofitsComponent } from './user/favorite-nonprofits/favorite-nonprofits.component';
import { HomeComponent } from './home/home.component';
import { NonprofitPageComponent } from './nonprofit/nonprofit-page/nonprofit-page.component';
import { AccountStatsPageComponent } from './user/account-stats-page/account-stats-page.component';
import { FriendsPageComponent } from './user/friends-page/friends-page.component';
import { LoginComponent } from './user/login/login.component';
import { ProfilePageComponent } from './user/profile-page/profile-page.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'nonprofit', component: NonprofitPageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'friends', component: FriendsPageComponent},
  {path: 'account-stats', component: AccountStatsPageComponent},
  {path: 'favorite-nonprofits', component: FavoriteNonprofitsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
